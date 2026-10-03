import { AnimatePresence, motion } from 'motion/react'
import { Crosshair, X } from 'lucide-react'
import { arsenal, projectById, skillById } from '../data/content'
import { SectionHeader } from './SectionHeader'
import { SkillIcon } from './SkillIcon'

const MAX_PIPS = 6
const totalSkills = arsenal.reduce((n, c) => n + c.skills.length, 0)

export function Arsenal({
  selected,
  onSelect,
  onOpenProject,
  onTraceInArchives,
}: {
  selected: string | null
  onSelect: (id: string | null) => void
  onOpenProject: (id: string) => void
  onTraceInArchives: (skillId: string) => void
}) {
  const skill = selected ? skillById[selected] : null

  return (
    <section id="arsenal" aria-labelledby="arsenal-title" className="border-y border-line bg-ash-2">
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8 lg:py-28">
        <SectionHeader index={3} id="arsenal" title="Arsenal">
          Tools I have actually built with, {totalSkills} of them in {arsenal.length} categories. The pips show how many records in the
          archive used each one. Select a tool to trace where it was deployed.
        </SectionHeader>

        {/* Trace readout */}
        <div className="sticky top-[3.6rem] z-20 mt-8 lg:top-[4.1rem]" aria-live="polite">
          <div className={`border bg-panel/95 backdrop-blur-md transition-colors ${skill ? 'border-amber' : 'border-line'}`}>
            <AnimatePresence mode="wait" initial={false}>
              {skill ? (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-5"
                >
                  <span className="flex items-center gap-2.5 text-amber">
                    <SkillIcon icon={skill.icon} glyph={skill.glyph} className="h-5 w-5" />
                    <span className="font-semibold text-bone">{skill.name}</span>
                  </span>
                  <span className="font-mono text-xs text-dust">
                    {skill.projects.length
                      ? `deployed in ${skill.projects.length} record${skill.projects.length > 1 ? 's' : ''}`
                      : 'used in Raynix AI client automations'}
                  </span>
                  <ul className="flex min-w-0 max-w-full flex-wrap gap-1.5">
                    {skill.projects.map((pid) => (
                      <li key={pid} className="min-w-0 max-w-full">
                        <button
                          type="button"
                          onClick={() => onOpenProject(pid)}
                          className="chip max-w-full border-amber-deep text-left text-bone transition-colors hover:border-amber hover:text-amber"
                        >
                          <span className="shrink-0 text-amber">{projectById[pid].code}</span>
                          <span className="truncate">{projectById[pid].name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <span className="ml-auto flex items-center gap-2">
                    {skill.projects.length > 0 && (
                      <button type="button" onClick={() => onTraceInArchives(skill.id)} className="font-mono text-xs text-amber underline underline-offset-4">
                        Filter the archives
                      </button>
                    )}
                    <button type="button" onClick={() => onSelect(null)} className="p-1 text-dust hover:text-amber" aria-label="Clear selected tool">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </span>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 px-4 py-3 font-mono text-xs text-dust sm:px-5"
                >
                  <Crosshair className="h-4 w-4 text-amber" aria-hidden="true" />
                  Select any tool below to see which records it was used in.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {arsenal.map((cat, ci) => (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="housing flex flex-col p-5 sm:p-6">
              <header className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
                <div>
                  <h3 id={`cat-${cat.id}`} className="font-display text-2xl font-bold uppercase tracking-wide text-bone">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-dust">{cat.blurb}</p>
                </div>
                <span className="font-mono text-xs tabular-nums text-dust-2">
                  {String(ci + 1).padStart(2, '0')}/{String(arsenal.length).padStart(2, '0')}
                </span>
              </header>
              <ul className="mt-2 flex-1">
                {cat.skills.map((s) => {
                  const isSel = selected === s.id
                  const count = s.projects.length
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        aria-pressed={isSel}
                        onClick={() => onSelect(isSel ? null : s.id)}
                        className={`group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-l-2 px-2 py-2.5 text-left transition-colors ${
                          isSel ? 'border-amber bg-amber/10' : 'border-transparent hover:border-amber-dim hover:bg-amber/[0.04]'
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center border transition-colors ${
                            isSel ? 'border-amber text-amber' : 'border-line-2 text-dust group-hover:text-amber'
                          }`}
                        >
                          <SkillIcon icon={s.icon} glyph={s.glyph} className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium leading-tight text-bone">{s.name}</span>
                          <span className="block truncate text-[0.8rem] text-dust-2">{s.note}</span>
                        </span>
                        <span
                          className="flex gap-[3px]"
                          role="img"
                          aria-label={count ? `Used in ${count} of the archive's records` : 'Used in client work'}
                          title={count ? `Used in ${count} record${count > 1 ? 's' : ''}` : 'Client work'}
                        >
                          {Array.from({ length: MAX_PIPS }, (_, i) => (
                            <span
                              key={i}
                              className={`h-3 w-1.5 ${i < count ? (isSel ? 'bg-amber' : 'bg-amber-dim') : 'bg-line'} `}
                              aria-hidden="true"
                            />
                          ))}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
