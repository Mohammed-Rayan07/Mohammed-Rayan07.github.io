import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const LINES: { text: string; result?: string; tone?: 'ok' | 'warn' | 'id' }[] = [
  { text: 'archive node 07 on emergency power', result: '3%', tone: 'warn' },
  { text: 'mounting /survivors', result: 'ok', tone: 'ok' },
  { text: 'checking archive integrity', result: '97.3%', tone: 'ok' },
  { text: 'locating survivor record MR-07', result: 'found', tone: 'ok' },
  { text: 'decrypting identity', result: 'ok', tone: 'ok' },
  { text: 'RAYAN, MOHAMMAD · status ONLINE', tone: 'id' },
]

const STEP = 230

/** First-visit boot sequence. Any key, click or the skip button dismisses it. */
export function Boot({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(LINES.length)
      const t = setTimeout(() => setLeaving(true), 500)
      return () => clearTimeout(t)
    }
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 180 + i * STEP))
    timers.push(setTimeout(() => setLeaving(true), 180 + LINES.length * STEP + 650))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const skip = () => setLeaving(true)
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          key="boot"
          role="dialog"
          aria-label="Archive boot sequence"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ash px-5"
          exit={{ opacity: 0, filter: 'brightness(2.2)', transition: { duration: 0.45 } }}
          onClick={() => setLeaving(true)}
        >
          <div className="w-full max-w-xl font-mono text-[0.8rem] leading-7 sm:text-sm">
            <div className="mb-5 flex items-center gap-3 text-amber">
              <span className="hazard h-2 w-10" aria-hidden="true" />
              <span>The Last Portfolio</span>
            </div>
            <ol>
              {LINES.slice(0, shown).map((l) => (
                <li key={l.text} className="flex gap-3">
                  <span className="text-dust-2" aria-hidden="true">
                    &gt;
                  </span>
                  {l.tone === 'id' ? (
                    <span className="glow text-amber">{l.text}</span>
                  ) : (
                    <>
                      <span className="text-bone">{l.text}</span>
                      <span className="min-w-4 flex-1 translate-y-[-0.3em] border-b border-dotted border-line-2" aria-hidden="true" />
                      <span className={l.tone === 'warn' ? 'text-alert' : 'text-signal'}>{l.result}</span>
                    </>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-2 h-7 text-amber">
              {shown < LINES.length ? <span className="animate-blink">▌</span> : <span>Access granted.</span>}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLeaving(true)
              }}
              className="mt-8 border border-line-2 px-3 py-1.5 text-dust transition-colors hover:border-amber hover:text-amber"
            >
              Skip boot sequence
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
