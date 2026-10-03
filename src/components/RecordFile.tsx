import { ChevronLeft, ChevronRight, ExternalLink, Lock, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { projectById, projects, skillById } from '../data/content'
import { statusTone } from '../lib/archive'
import { GitHubIcon, SkillIcon } from './SkillIcon'

/** The full classified file for one project, opened over the archive. */
export function RecordFile({ id, onClose, onNavigate }: { id: string | null; onClose: () => void; onNavigate: (id: string) => void }) {
  const p = id ? projectById[id] : null
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const [imgIndex, setImgIndex] = useState(0)

  const index = p ? projects.findIndex((x) => x.id === p.id) : -1
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1]
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0]

  useEffect(() => {
    setImgIndex(0)
    panelRef.current?.scrollTo({ top: 0 })
  }, [id])

  useEffect(() => {
    if (!p) return
    returnFocus.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      returnFocus.current?.focus?.()
    }
    // Only when the dialog opens or closes, not on record changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Boolean(p)])

  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && !(e.target instanceof HTMLInputElement)) onNavigate(next.id)
      else if (e.key === 'ArrowLeft' && !(e.target instanceof HTMLInputElement)) onNavigate(prev.id)
      else if (e.key === 'Tab' && panelRef.current) {
        // Keep focus inside the dialog.
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p, prev, next, onClose, onNavigate])

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="record"
          className="fixed inset-0 z-[80] flex items-stretch justify-center bg-black/75 backdrop-blur-sm sm:p-4 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-title"
            className="housing scrollbar-thin relative w-full max-w-6xl overflow-y-auto bg-ash"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-ash/95 px-4 py-3 backdrop-blur-md sm:px-6">
              <span className="whitespace-nowrap font-mono text-sm text-amber">{p.code}</span>
              <span className={`whitespace-nowrap border px-2 py-0.5 font-mono text-xs ${statusTone[p.status]}`}>{p.status}</span>
              <span className="hidden truncate font-mono text-xs text-dust-2 sm:inline">
                Record {index + 1} of {projects.length}
              </span>
              <div className="ml-auto flex items-center gap-1">
                <button type="button" onClick={() => onNavigate(prev.id)} className="p-2 text-dust hover:text-amber" aria-label={`Previous record: ${prev.name}`}>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => onNavigate(next.id)} className="p-2 text-dust hover:text-amber" aria-label={`Next record: ${next.name}`}>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="ml-1 flex items-center gap-1.5 border border-line-2 px-2.5 py-1.5 font-mono text-xs text-bone hover:border-amber hover:text-amber"
                >
                  <X className="h-4 w-4" aria-hidden="true" /> Close
                </button>
              </div>
            </div>

            <div className="px-4 pb-10 pt-6 sm:px-8 lg:px-10">
              <p className="font-mono text-xs text-dust-2">
                {p.event} <span aria-hidden="true">/</span> {p.year}
              </p>
              <h2 id="record-title" className="mt-2 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.9] text-bone">
                {p.name}
              </h2>
              <p className="mt-2 text-lg text-amber">{p.tagline}</p>
              {p.role && <p className="mt-1 font-mono text-sm text-dust">Role: {p.role}</p>}

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                {/* Gallery */}
                <div>
                  <figure>
                    <div className="relative overflow-hidden border border-line bg-panel">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.img
                          key={p.images[imgIndex]?.src}
                          src={p.images[imgIndex]?.src}
                          alt={p.images[imgIndex]?.alt}
                          className={`block aspect-[16/10] w-full object-contain ${p.images[imgIndex]?.tone === 'invert' ? 'tone-invert' : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        />
                      </AnimatePresence>
                    </div>
                    <figcaption className="mt-2 text-sm text-dust">{p.images[imgIndex]?.caption}</figcaption>
                  </figure>
                  {p.images.length > 1 && (
                    <div className="mt-3 flex gap-2" role="group" aria-label="Images">
                      {p.images.map((im, i) => (
                        <button
                          key={im.src}
                          type="button"
                          onClick={() => setImgIndex(i)}
                          aria-pressed={i === imgIndex}
                          aria-label={`Show image ${i + 1}: ${im.caption}`}
                          className={`w-24 overflow-hidden border ${i === imgIndex ? 'border-amber' : 'border-line opacity-60 hover:opacity-100'}`}
                        >
                          <img src={im.src} alt="" className={`aspect-[16/10] w-full object-cover object-top ${im.tone === 'invert' ? 'tone-invert' : ''}`} />
                        </button>
                      ))}
                    </div>
                  )}

                  <dl className="mt-6 flex flex-wrap gap-px border border-line bg-line">
                    {p.proof.map((s) => (
                      <div key={s.label} className="flex min-w-[9rem] flex-1 flex-col-reverse justify-end bg-ash p-4">
                        <dt className="text-xs leading-snug text-dust">{s.label}</dt>
                        <dd className="font-display text-3xl font-extrabold text-amber">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Brief */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-sm text-amber">What it is</h3>
                    <p className="mt-2 text-[1.05rem] leading-relaxed text-bone">{p.oneLiner}</p>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-amber">The problem</h3>
                    <p className="mt-2 leading-relaxed text-dust">{p.problem}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-primary px-3.5 py-2 text-xs">
                        <GitHubIcon className="h-4 w-4" /> View source
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-ghost px-3.5 py-2 text-xs">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open live site
                      </a>
                    )}
                    {p.sealed && (
                      <span className="flex items-center gap-2 border border-dashed border-line-2 px-3 py-2 font-mono text-xs text-dust">
                        <Lock className="h-3.5 w-3.5" aria-hidden="true" /> {p.sealed}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
                <div>
                  <h3 className="font-mono text-sm text-amber">What it does</h3>
                  <ul className="mt-3 space-y-2.5">
                    {p.does.map((d) => (
                      <li key={d} className="flex gap-3 leading-relaxed text-bone/90">
                        <span className="mt-2.5 h-1 w-2 shrink-0 bg-amber" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-sm text-amber">How it works</h3>
                  <ul className="mt-3 space-y-2.5">
                    {p.how.map((d) => (
                      <li key={d} className="flex gap-3 leading-relaxed text-dust">
                        <span className="mt-2 h-2 w-2 shrink-0 border border-amber-dim" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {p.failures && p.fixes && (
                <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-sm text-alert">Failure modes logged on test calls</h3>
                    <ul className="mt-3 space-y-2">
                      {p.failures.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-bone">
                          <span className="h-2 w-2 shrink-0 bg-alert" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-amber">What the architecture added</h3>
                    <ul className="mt-3 space-y-2">
                      {p.fixes.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-bone">
                          <span className="h-2 w-2 shrink-0 bg-amber" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-dust">The fix wasn’t another clever prompt. It became an architecture problem.</p>
                  </div>
                </div>
              )}

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="font-mono text-sm text-amber">Built with</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((sid) => {
                    const s = skillById[sid]
                    return (
                      <li key={sid} className="chip py-1 text-bone">
                        {s && <SkillIcon icon={s.icon} glyph={s.glyph} className="h-3.5 w-3.5 text-amber" />}
                        {s?.name ?? sid}
                      </li>
                    )
                  })}
                  {p.extraStack?.map((x) => (
                    <li key={x} className="chip py-1 text-bone">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-line pt-6" aria-label="More records">
                <button type="button" onClick={() => onNavigate(prev.id)} className="group text-left">
                  <span className="font-mono text-xs text-dust-2">Previous record</span>
                  <span className="mt-1 block font-display text-lg font-bold text-bone group-hover:text-amber">
                    {prev.code} {prev.name}
                  </span>
                </button>
                <button type="button" onClick={() => onNavigate(next.id)} className="group text-right">
                  <span className="font-mono text-xs text-dust-2">Next record</span>
                  <span className="mt-1 block font-display text-lg font-bold text-bone group-hover:text-amber">
                    {next.code} {next.name}
                  </span>
                </button>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
