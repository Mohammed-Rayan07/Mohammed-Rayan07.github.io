import type { ReactNode } from 'react'

/** Sector heading. Sectors are stops along one route, so they are numbered. */
export function SectionHeader({ index, id, title, children }: { index: number; id: string; title: string; children?: ReactNode }) {
  return (
    <header className="grid gap-6 border-b border-line pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end">
      <div>
        <p className="flex items-center gap-3 font-mono text-sm text-amber">
          <span className="tabular-nums">Sector {String(index).padStart(2, '0')}</span>
          <span className="h-px w-12 bg-amber-dim" aria-hidden="true" />
        </p>
        <h2 id={`${id}-title`} className="section-title mt-3 uppercase">
          {title}
        </h2>
      </div>
      {children && <div className="max-w-[60ch] text-[1.02rem] leading-relaxed text-dust">{children}</div>}
    </header>
  )
}
