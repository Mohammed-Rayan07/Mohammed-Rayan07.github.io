import { Award, BookOpen, Dumbbell, Lightbulb, Rocket, Sparkles, Users, Wrench, type LucideIcon } from 'lucide-react'
import { dossier, fieldRecord, layers, log, projectById, survivor } from '../data/content'
import { SectionHeader } from './SectionHeader'

const offDutyIcons: LucideIcon[] = [Dumbbell, Rocket, Sparkles, Lightbulb]

export function SurvivorLog({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section id="log" aria-labelledby="log-title" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeader index={2} id="log" title="Survivor’s log">
        Where I came from, what I have built so far, and what I am building toward. Recovered from the archive in the order it happened.
      </SectionHeader>

      {/* Origin story + dossier */}
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <article className="housing p-6 sm:p-8">
          <h3 className="font-mono text-sm text-amber">Transit record</h3>
          <TransitRoute />
          <div className="mt-8 max-w-[62ch] space-y-4 leading-relaxed text-bone/90">
            <p>
              I grew up in Riyadh, Saudi Arabia, and moved to India to study AI engineering at NITK Surathkal. I got into AI because learning about
              technology wasn’t enough. I wanted to build things with it, solve real problems, and turn ideas into products.
            </p>
            <p>
              My interest started with an obvious question: <em className="text-amber not-italic">what can this technology actually do outside a notebook or a classroom?</em>{' '}
              That question pushed me into voice agents, business automation, multi-agent systems, dashboards and digital products.
            </p>
            <p>The pattern across everything I build: I like taking messy problems and turning them into systems.</p>
          </div>
          <ul className="mt-6 grid gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-sm text-dust sm:grid-cols-2">
            <li>
              <span className="text-dust-2">Sometimes it’s </span>an AI agent.
            </li>
            <li>
              <span className="text-dust-2">Sometimes it’s </span>a software architecture.
            </li>
            <li>
              <span className="text-dust-2">Sometimes it’s </span>a business funnel.
            </li>
            <li>
              <span className="text-dust-2">Sometimes it’s </span>an experiment that fails and teaches me what the idea got wrong.
            </li>
          </ul>
        </article>

        <aside className="grid content-start gap-6" aria-label="Dossier">
          <div className="housing p-6">
            <h3 className="flex items-center gap-2 font-mono text-sm text-amber">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Education
            </h3>
            <p className="mt-3 font-display text-2xl font-bold leading-tight text-bone">{dossier.education.degree}</p>
            <p className="mt-1 text-dust">
              {dossier.education.school} · {dossier.education.year}
            </p>
            <p className="mt-4 text-sm text-dust-2">Strengthening the fundamentals behind the systems I build:</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {dossier.education.coursework.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="housing p-6">
              <h3 className="flex items-center gap-2 font-mono text-sm text-amber">
                <Users className="h-4 w-4" aria-hidden="true" /> Crews
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-bone">
                {dossier.crews.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-amber" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="housing p-6">
              <h3 className="flex items-center gap-2 font-mono text-sm text-amber">
                <Wrench className="h-4 w-4" aria-hidden="true" /> Off duty
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-bone">
                {dossier.offDuty.map((o, i) => {
                  const Icon = offDutyIcons[i % offDutyIcons.length]
                  return (
                    <li key={o} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-dust" aria-hidden="true" />
                      {o}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* The lesson */}
      <figure className="relative mt-6 overflow-hidden border border-amber-deep bg-[linear-gradient(110deg,rgb(255_180_59/0.08),transparent_60%)] p-6 sm:p-10">
        <span className="hazard absolute inset-y-0 left-0 w-1.5" aria-hidden="true" />
        <figcaption className="font-mono text-sm text-amber">What the medical-logistics build taught me</figcaption>
        <blockquote className="mt-4 max-w-[52ch] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.12] text-bone">
          <p>{dossier.lesson[0]}</p>
          <p className="mt-3 text-dust">{dossier.lesson[1]}</p>
        </blockquote>
        <p className="mt-6 font-mono text-sm text-amber">→ {survivor.principle}</p>
      </figure>

      {/* Timeline + layers + field record */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="housing p-6 sm:p-8">
          <h3 className="font-mono text-sm text-amber">Log entries</h3>
          <ol className="relative mt-6 space-y-0">
            {log.map((entry, i) => {
              const project = entry.project ? projectById[entry.project] : undefined
              const last = i === log.length - 1
              return (
                <li key={entry.id} className="relative grid grid-cols-[5.5rem_1fr] gap-4 pb-7 sm:grid-cols-[7.5rem_1fr]">
                  <span className="pt-0.5 text-right font-mono text-xs leading-5 text-dust-2">{entry.stamp}</span>
                  <div className="relative border-l border-line-2 pl-5">
                    <span
                      className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] ${
                        last ? 'animate-pulse-soft bg-alert' : entry.kind === 'hackathon' ? 'bg-amber' : entry.kind === 'origin' ? 'border border-amber bg-ash' : 'bg-amber-dim'
                      }`}
                      aria-hidden="true"
                    />
                    <h4 className="font-semibold leading-snug text-bone">
                      {entry.title}
                      {entry.kind === 'hackathon' && <span className="ml-2 align-middle font-mono text-[0.68rem] font-normal text-amber">hackathon</span>}
                      {last && <span className="ml-2 align-middle font-mono text-[0.68rem] font-normal text-alert">now</span>}
                    </h4>
                    <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-dust">{entry.body}</p>
                    {project && (
                      <button
                        type="button"
                        onClick={() => onOpenProject(project.id)}
                        className="mt-2 font-mono text-xs text-amber underline decoration-amber-deep underline-offset-4 hover:decoration-amber"
                      >
                        Open record {project.code}
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="grid content-start gap-6">
          <div className="housing p-6 sm:p-7">
            <h3 className="font-mono text-sm text-amber">I build across three layers</h3>
            <ol className="mt-5 space-y-2">
              {layers.map((l, i) => (
                <li
                  key={l.name}
                  className={`border px-4 py-3 ${i === layers.length - 1 ? 'border-amber bg-amber/[0.07]' : 'border-line-2'}`}
                  style={{ marginLeft: `${i * 0.9}rem` }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-bold text-bone">{l.name}</span>
                    <span className="font-mono text-xs text-dust-2">layer {i + 1}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-dust">{l.items}</p>
                  {l.note && <p className="mt-2 font-mono text-xs text-amber">{l.note}</p>}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-dust">
              I don’t want to build technology just because it’s impressive. I want to know what problem it solves, who cares about that problem,
              and whether the system creates measurable value.
            </p>
          </div>

          <div className="housing p-6 sm:p-7">
            <h3 className="flex items-center gap-2 font-mono text-sm text-amber">
              <Award className="h-4 w-4" aria-hidden="true" /> Field record
            </h3>
            <ul className="mt-4 divide-y divide-line">
              {fieldRecord.map((f) => (
                <li key={f.title} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    {f.badge && (
                      <span
                        className={`mt-0.5 shrink-0 px-1.5 py-0.5 font-mono text-[0.68rem] ${
                          f.badge === 'Winner' ? 'bg-amber text-ash' : 'border border-line-2 text-amber'
                        }`}
                      >
                        {f.badge}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-bone">{f.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-dust">{f.body}</p>
                      {f.project && (
                        <button
                          type="button"
                          onClick={() => onOpenProject(f.project!)}
                          className="mt-1.5 font-mono text-xs text-amber underline decoration-amber-deep underline-offset-4 hover:decoration-amber"
                        >
                          Open record {projectById[f.project]?.code}
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Objective */}
      <div className="mt-6 grid border border-line md:grid-cols-2">
        <div className="p-6 sm:p-8">
          <p className="font-mono text-sm text-amber">Current objective</p>
          <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-bone">{dossier.objective}</p>
        </div>
        <div className="border-t border-line p-6 sm:p-8 md:border-l md:border-t-0">
          <p className="font-mono text-sm text-amber">Long-term mission</p>
          <p className="mt-3 max-w-[48ch] text-lg leading-relaxed text-bone">{dossier.mission}</p>
          <p className="mt-4 text-sm text-dust">I’m still early in my journey, and that’s intentional.</p>
        </div>
      </div>
    </section>
  )
}

function TransitRoute() {
  return (
    <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
      <div>
        <p className="font-stencil text-4xl font-extrabold leading-none text-bone sm:text-5xl">RUH</p>
        <p className="mt-1 text-xs text-dust sm:text-sm">Riyadh, Saudi Arabia</p>
        <p className="font-mono text-[0.68rem] text-dust-2">grew up</p>
      </div>
      <svg viewBox="0 0 200 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 30 Q100 -6 196 30" fill="none" stroke="var(--color-amber-dim)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
        <circle cx="4" cy="30" r="3" fill="var(--color-amber)" />
        <rect x="191" y="25" width="10" height="10" fill="none" stroke="var(--color-alert)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="text-right">
        <p className="glow font-stencil text-4xl font-extrabold leading-none text-amber sm:text-5xl">NITK</p>
        <p className="mt-1 text-xs text-dust sm:text-sm">Surathkal, India</p>
        <p className="font-mono text-[0.68rem] text-dust-2">building</p>
      </div>
    </div>
  )
}
