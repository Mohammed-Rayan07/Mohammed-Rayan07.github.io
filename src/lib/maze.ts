// Perfect-maze generation (iterative recursive backtracker) and BFS solving.
// Walls are stored per cell as a 4-bit mask: N=1, E=2, S=4, W=8.

export const N = 1
export const E = 2
export const S = 4
export const W = 8

export type Maze = {
  cols: number
  rows: number
  walls: Uint8Array
}

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DIRS = [
  { bit: N, opp: S, dx: 0, dy: -1 },
  { bit: E, opp: W, dx: 1, dy: 0 },
  { bit: S, opp: N, dx: 0, dy: 1 },
  { bit: W, opp: E, dx: -1, dy: 0 },
]

export function generateMaze(cols: number, rows: number, rand: () => number): Maze {
  const walls = new Uint8Array(cols * rows).fill(N | E | S | W)
  const seen = new Uint8Array(cols * rows)
  const stack: number[] = []
  const start = Math.floor(rand() * cols * rows)
  stack.push(start)
  seen[start] = 1

  while (stack.length) {
    const cur = stack[stack.length - 1]
    const cx = cur % cols
    const cy = (cur - cx) / cols
    const options: number[] = []
    for (let d = 0; d < 4; d++) {
      const nx = cx + DIRS[d].dx
      const ny = cy + DIRS[d].dy
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
      if (!seen[ny * cols + nx]) options.push(d)
    }
    if (!options.length) {
      stack.pop()
      continue
    }
    const d = options[Math.floor(rand() * options.length)]
    const next = (cy + DIRS[d].dy) * cols + (cx + DIRS[d].dx)
    walls[cur] &= ~DIRS[d].bit
    walls[next] &= ~DIRS[d].opp
    seen[next] = 1
    stack.push(next)
  }

  // Knock out a few extra walls so the maze reads as a city grid, not a single corridor.
  const extra = Math.floor(cols * rows * 0.06)
  for (let i = 0; i < extra; i++) {
    const c = Math.floor(rand() * cols * rows)
    const cx = c % cols
    const cy = (c - cx) / cols
    const d = Math.floor(rand() * 4)
    const nx = cx + DIRS[d].dx
    const ny = cy + DIRS[d].dy
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
    walls[c] &= ~DIRS[d].bit
    walls[ny * cols + nx] &= ~DIRS[d].opp
  }

  return { cols, rows, walls }
}

/** Breadth-first search. Returns the visit order (for the scanning effect) and the path. */
export function solveMaze(maze: Maze, from: number, to: number) {
  const { cols, rows, walls } = maze
  const prev = new Int32Array(cols * rows).fill(-1)
  const order: number[] = [from]
  prev[from] = from
  let head = 0
  while (head < order.length) {
    const cur = order[head++]
    if (cur === to) break
    const cx = cur % cols
    const cy = (cur - cx) / cols
    for (const dir of DIRS) {
      if (walls[cur] & dir.bit) continue
      const nx = cx + dir.dx
      const ny = cy + dir.dy
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
      const n = ny * cols + nx
      if (prev[n] !== -1) continue
      prev[n] = cur
      order.push(n)
    }
  }
  const path: number[] = []
  if (prev[to] === -1) return { order, path }
  for (let c = to; c !== from; c = prev[c]) path.push(c)
  path.push(from)
  path.reverse()
  return { order, path }
}
