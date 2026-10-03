import { useEffect, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>'

/**
 * Text that resolves out of noise, left to right, once.
 * Screen readers get the final text immediately via aria-label.
 */
export function Decode({ text, start = true, duration = 900, className = '' }: { text: string; start?: boolean; duration?: number; className?: string }) {
  const [out, setOut] = useState(() => (start ? text.replace(/\S/g, ' ') : text))

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const solved = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ' || i < solved) s += ch
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOut(s)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, start, duration])

  return (
    <span aria-label={text} className={className}>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
