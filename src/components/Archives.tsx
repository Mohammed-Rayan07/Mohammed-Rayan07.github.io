import { ExternalLink, FolderOpen, Lock, X } from 'lucide-react'
import { motion } from 'motion/react'
import { projects, skillById, type Project } from '../data/content'
import { TAGS, filterProjects, statusTone, type ArchiveFilter } from '../lib/archive'
import { SectionHeader } from './SectionHeader'
import { GitHubIcon } from './SkillIcon'

export function Archives({ filter, onFilter, onOpen }: { filter: ArchiveFilter; onFilter: (f: ArchiveFilter) => void; onOpen: (id: string) => void }) {
  const list = filterProjects(filter)

  return (
    <section id="archives" aria-labelledby="archives-title" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeader index={4} id="archives" title="Archives">
        {projects.length} recovered records. Each one says what the project does, how it works and what it proved. Open a record for the full
        file.
      </SectionHeader>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Filter records">
        <FilterButton active={filter.kind === 'all'} onClick={() => onFilter({ kind: 'all' })}>
          All records <span className="text-dust-2">{projects.length}</span>
        </FilterButton>
        {TAGS.map((t) => (
          <FilterButton key={t.id} active={filter.kind === 'tag' && filter.id === t.id} onClick={() => onFilter({ kind: 'tag', id: t.id })}>
            {t.label} <span className="text-dust-2">{projects.filter(t.test).length}</span>
          </FilterButton>
        ))}
        {filter.kind === 'skill' && (
          <button
            type="button"
            onClick={() => onFilter({ kind: 'all' })}
            className="flex items-center gap-2 border border-amber bg-amber px-3 py-1.5 font-mono text-xs text-ash"
            aria-label={`Clear filter: ${skillById[filter.id]?.name}`}
          >
            Traced: {skillById[filter.id]?.name}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
        <span className="ml-auto font-mono text-xs text-dust-2" aria-live="polite">
          Showing {list.length} of {projects.length}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className={i === 0 && list.length > 2 ? 'md:col-span-2' : ''}
          >
            <RecordCard project={p} featured={i === 0 && list.length > 2} onOpen={() => onOpen(p.id)} />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-xs transition-colors ${
        active ? 'border-amber bg-amber/10 text-amber' : 'border-line-2 text-dust hover:border-amber-dim hover:text-bone'
      }`}
    >
      {children}
    </button>
  )
}

function RecordCard({ project: p, featured, onOpen }: { project: Project; featured: boolean; onOpen: () => void }) {
  const img = p.images[0]
  const shown = p.stack.slice(0, featured ? 8 : 5)
  const more = p.stack.length - shown.length + (p.extraStack?.length ?? 0)

  return (
    <article className={`housing group grid h-full overflow-hidden ${featured ? 'lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]' : 'grid-rows-[auto_1fr]'}`}>
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-ash text-left lg:border-b-0"
        aria-label={`Open record ${p.code}: ${p.name}`}
      >
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className={`h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${img.tone === 'invert' ? 'tone-invert' : ''}`}
        />
        <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(0_0_0/0.18)_3px)]" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ash/60 via-transparent to-ash/25" aria-hidden="true" />
        <span className="absolute left-3 top-3 bg-ash/85 px-2 py-1 font-mono text-xs text-amber">{p.code}</span>
        <span className={`absolute right-3 top-3 border bg-ash/85 px-2 py-1 font-mono text-xs ${statusTone[p.status]}`}>{p.status}</span>
        {p.images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-ash/85 px-2 py-1 font-mono text-[0.68rem] text-dust">{p.images.length} images</span>
        )}
      </button>

      <div className={`flex flex-col p-5 sm:p-6 ${featured ? 'lg:border-l lg:border-line lg:p-8' : ''}`}>
        <p className="font-mono text-xs text-dust-2">
          {p.event} <span aria-hidden="true">/</span> {p.year}
        </p>
        <h3 className={`mt-2 font-display font-extrabold uppercase leading-[0.95] text-bone ${featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{p.name}</h3>
        <p className="mt-1 text-sm text-amber">{p.tagline}</p>
        <p className="mt-3 leading-relaxed text-dust">{p.oneLiner}</p>

        {featured && (
          <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
            {p.proof.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end">
                <dt className="text-xs leading-snug text-dust">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-amber">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {shown.map((id) => (
            <li key={id} className="chip">
              {skillById[id]?.name ?? id}
            </li>
          ))}
          {more > 0 && <li className="chip border-dashed">+{more} more</li>}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
          <button type="button" onClick={onOpen} className="btn btn-primary px-3.5 py-2 text-xs">
            <FolderOpen className="h-4 w-4" aria-hidden="true" />
            Open record
          </button>
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-xs text-bone hover:text-amber">
              <GitHubIcon className="h-4 w-4" /> Source
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-mono text-xs text-bone hover:text-amber">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live
            </a>
          )}
          {p.sealed && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-dust-2" title={p.sealed}>
              <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Source sealed
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
