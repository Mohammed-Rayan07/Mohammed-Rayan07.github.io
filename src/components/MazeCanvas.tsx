import { useEffect, useRef } from 'react'
import { E, N, S, W, generateMaze, mulberry32, solveMaze, type Maze } from '../lib/maze'

type Phase = 'scan' | 'trace' | 'hold' | 'fade'

const AMBER = '255,180,59'

/**
 * The hero backdrop: a fresh maze per visit. A survivor's trail searches it (BFS),
 * then traces the route home, carrying a torch. The pointer is a second torch.
 */
export function MazeCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rand = mulberry32((Date.now() ^ 0x5eed) >>> 0)

    let maze: Maze
    let cell = 30
    let w = 0
    let h = 0
    let dpr = 1
    let offX = 0
    let offY = 0
    const wallLayer = document.createElement('canvas')
    const torchLayer = document.createElement('canvas')

    let from = 0
    let to = 0
    let order: number[] = []
    let path: number[] = []
    let phase: Phase = 'scan'
    let phaseStart = 0
    let raf = 0
    let running = true
    let pointer = { x: -9999, y: -9999, t: 0 }

    const centre = (c: number) => {
      const x = c % maze.cols
      const y = (c - x) / maze.cols
      return [offX + x * cell + cell / 2, offY + y * cell + cell / 2] as const
    }

    function pickEnd(avoid: number) {
      for (let i = 0; i < 40; i++) {
        const c = Math.floor(rand() * maze.cols * maze.rows)
        const [ax, ay] = centre(avoid)
        const [bx, by] = centre(c)
        if (Math.hypot(ax - bx, ay - by) > Math.min(w, h) * 0.55) return c
      }
      return Math.floor(rand() * maze.cols * maze.rows)
    }

    function route(start: number) {
      from = start
      to = pickEnd(from)
      const r = solveMaze(maze, from, to)
      order = r.order
      path = r.path
      phase = reduced ? 'hold' : 'scan'
      phaseStart = performance.now()
    }

    function drawWalls(target: HTMLCanvasElement, color: string, lw: number) {
      target.width = w * dpr
      target.height = h * dpr
      const c = target.getContext('2d')!
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.strokeStyle = color
      c.lineWidth = lw
      c.lineCap = 'square'
      c.beginPath()
      for (let i = 0; i < maze.cols * maze.rows; i++) {
        const x = offX + (i % maze.cols) * cell
        const y = offY + Math.floor(i / maze.cols) * cell
        const m = maze.walls[i]
        if (m & N) {
          c.moveTo(x, y)
          c.lineTo(x + cell, y)
        }
        if (m & W) {
          c.moveTo(x, y)
          c.lineTo(x, y + cell)
        }
        if (m & S && Math.floor(i / maze.cols) === maze.rows - 1) {
          c.moveTo(x, y + cell)
          c.lineTo(x + cell, y + cell)
        }
        if (m & E && i % maze.cols === maze.cols - 1) {
          c.moveTo(x + cell, y)
          c.lineTo(x + cell, y + cell)
        }
      }
      c.stroke()
    }

    function setup() {
      const rect = canvas!.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      cell = w < 640 ? 24 : 32
      const cols = Math.ceil(w / cell) + 1
      const rows = Math.ceil(h / cell) + 1
      offX = Math.floor((w - cols * cell) / 2)
      offY = Math.floor((h - rows * cell) / 2)
      maze = generateMaze(cols, rows, rand)
      drawWalls(wallLayer, `rgba(${AMBER},1)`, 1)
      torchLayer.width = w * dpr
      torchLayer.height = h * dpr
      route(Math.floor(rand() * cols * rows))
    }

    function headPosition(now: number): readonly [number, number] | null {
      if (!path.length) return null
      if (phase === 'scan') return centre(from)
      if (phase === 'trace') {
        const t = Math.max(0, Math.min(1, (now - phaseStart) / traceDuration()))
        const f = t * (path.length - 1)
        const i = Math.floor(f)
        const [ax, ay] = centre(path[i])
        const [bx, by] = centre(path[Math.min(i + 1, path.length - 1)])
        return [ax + (bx - ax) * (f - i), ay + (by - ay) * (f - i)]
      }
      return centre(to)
    }

    const scanDuration = () => Math.min(2600, 500 + order.length * 2.2)
    const traceDuration = () => Math.min(3200, 600 + path.length * 38)

    function frame(now: number) {
      if (!running) return
      const elapsed = now - phaseStart
      if (phase === 'scan' && elapsed > scanDuration()) {
        phase = 'trace'
        phaseStart = now
      } else if (phase === 'trace' && elapsed > traceDuration()) {
        phase = 'hold'
        phaseStart = now
      } else if (phase === 'hold' && elapsed > 2600 && !reduced) {
        phase = 'fade'
        phaseStart = now
      } else if (phase === 'fade' && elapsed > 900) {
        route(to)
      }

      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      // Dim maze everywhere.
      ctx!.globalAlpha = 0.085
      ctx!.drawImage(wallLayer, 0, 0)
      ctx!.globalAlpha = 1
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const fade = phase === 'fade' ? 1 - Math.max(0, Math.min(1, (now - phaseStart) / 900)) : 1

      // Searched cells.
      const scanned =
        phase === 'scan' ? Math.max(0, Math.floor((order.length * (now - phaseStart)) / scanDuration())) : order.length
      ctx!.fillStyle = `rgba(${AMBER},${0.045 * fade})`
      for (let i = 0; i < scanned; i++) {
        const c = order[i]
        ctx!.fillRect(offX + (c % maze.cols) * cell + 2, offY + Math.floor(c / maze.cols) * cell + 2, cell - 4, cell - 4)
      }

      // Torches: the trail head, and the pointer while it is moving.
      const head = headPosition(now)
      const torches: (readonly [number, number, number])[] = []
      if (head) torches.push([head[0], head[1], cell * 4.2])
      if (now - pointer.t < 2500) torches.push([pointer.x, pointer.y, cell * 6])

      const tc = torchLayer.getContext('2d')!
      tc.setTransform(1, 0, 0, 1, 0, 0)
      tc.globalCompositeOperation = 'source-over'
      tc.clearRect(0, 0, torchLayer.width, torchLayer.height)
      tc.drawImage(wallLayer, 0, 0)
      tc.globalCompositeOperation = 'destination-in'
      tc.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (const [x, y, r] of torches) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue
        const g = tc.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, 'rgba(0,0,0,0.75)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        tc.fillStyle = g
        tc.fillRect(x - r, y - r, r * 2, r * 2)
      }
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.drawImage(torchLayer, 0, 0)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // The route.
      if (path.length && phase !== 'scan') {
        const t = phase === 'trace' ? Math.max(0, Math.min(1, (now - phaseStart) / traceDuration())) : 1
        const upto = Math.max(1, Math.floor(t * (path.length - 1)) + 1)
        ctx!.save()
        ctx!.lineJoin = 'round'
        ctx!.lineCap = 'round'
        ctx!.shadowColor = `rgba(${AMBER},0.8)`
        ctx!.shadowBlur = 10
        ctx!.strokeStyle = `rgba(${AMBER},${0.75 * fade})`
        ctx!.lineWidth = 2
        ctx!.beginPath()
        const [sx, sy] = centre(path[0])
        ctx!.moveTo(sx, sy)
        for (let i = 1; i < upto; i++) {
          const [x, y] = centre(path[i])
          ctx!.lineTo(x, y)
        }
        if (head && phase === 'trace') ctx!.lineTo(head[0], head[1])
        ctx!.stroke()
        ctx!.restore()
      }

      // Endpoints.
      if (path.length) {
        const [fx, fy] = centre(from)
        const [ex, ey] = centre(to)
        ctx!.strokeStyle = `rgba(${AMBER},${0.6 * fade})`
        ctx!.lineWidth = 1.5
        ctx!.strokeRect(fx - 5, fy - 5, 10, 10)
        const blink = Math.floor(now / 500) % 2 === 0 ? 1 : 0.35
        ctx!.strokeStyle = `rgba(255,90,54,${blink * fade})`
        ctx!.strokeRect(ex - 7, ey - 7, 14, 14)
      }
      if (head) {
        ctx!.fillStyle = `rgba(255,220,150,${fade})`
        ctx!.shadowColor = `rgba(${AMBER},1)`
        ctx!.shadowBlur = 14
        ctx!.beginPath()
        ctx!.arc(head[0], head[1], 3.2, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    setup()
    if (reduced) {
      phase = 'hold'
      frame(performance.now())
    } else {
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      setup()
      if (reduced) frame(performance.now())
      else if (running) raf = requestAnimationFrame(frame)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !running) {
        running = true
        phaseStart = performance.now()
        if (!reduced) raf = requestAnimationFrame(frame)
      } else if (!visible) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() }
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />
}
