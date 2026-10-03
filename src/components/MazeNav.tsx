import { Archive, Crosshair, Fingerprint, RadioTower, ScrollText, type LucideIcon } from 'lucide-react'
import { sectors, type SectorId } from '../data/content'
import { scrollToSector } from '../lib/hooks'

const icons: Record<SectorId, LucideIcon> = {
  identity: Fingerprint,
  log: ScrollText,
  arsenal: Crosshair,
  archives: Archive,
  transmission: RadioTower,
}

// A corridor through the archive: each node is a sector, the route between them zig-zags like a maze.
const NODE_Y = [40, 170, 300, 430, 560]
const NODE_X = [38, 38, 38, 38, 38]
const ROUTE = 'M38 40 V90 H18 V130 H58 V170 V220 H22 V260 H38 V300 V350 H56 V390 H20 V430 V480 H38 V520 H56 V560'

/** Desktop: a maze minimap down the left edge. Mobile: a bottom bar. */
export function MazeNav({ active, progress }: { active: SectorId; progress: number }) {
  const activeIndex = sectors.findIndex((s) => s.id === active)

  return (
    <>
      <nav aria-label="Archive sectors" className="fixed bottom-0 left-0 top-14 z-40 hidden w-[84px] border-r border-line bg-ash/70 lg:flex lg:items-center">
        <div className="relative mx-auto h-[600px] max-h-[calc(100vh-7rem)] w-[76px]">
          <svg viewBox="0 0 76 600" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
            <path d={ROUTE} stroke="var(--color-line-2)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            <path
              d={ROUTE}
              stroke="var(--color-amber)"
              strokeWidth="2"
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'drop-shadow(0 0 4px var(--color-amber))' }}
            />
          </svg>
          {sectors.map((s, i) => {
            const Icon = icons[s.id]
            const isActive = i === activeIndex
            const visited = i < activeIndex
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSector(s.id)}
                aria-current={isActive ? 'location' : undefined}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(NODE_X[i] / 76) * 100}%`, top: `${(NODE_Y[i] / 600) * 100}%` }}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center border transition-colors ${
                    isActive
                      ? 'border-amber bg-amber text-ash shadow-[0_0_18px_rgb(255_180_59/0.45)]'
                      : visited
                        ? 'border-amber/70 bg-ash text-amber'
                        : 'border-line-2 bg-ash text-dust group-hover:border-amber group-hover:text-amber'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className={`pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap border border-line-2 bg-panel px-2 py-1 font-mono text-xs text-bone transition-opacity ${
                    isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }`}
                >
                  {s.label}
                </span>
                <span className="sr-only">{s.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <nav aria-label="Archive sectors" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ash/92 backdrop-blur-md lg:hidden">
        <div className="h-px bg-line" aria-hidden="true">
          <div className="h-px origin-left bg-amber" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <ul className="mx-auto grid max-w-lg grid-cols-5 pb-[env(safe-area-inset-bottom)]">
          {sectors.map((s) => {
            const Icon = icons[s.id]
            const isActive = s.id === active
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToSector(s.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex h-[60px] w-full flex-col items-center justify-center gap-1 font-mono text-[0.62rem] transition-colors ${
                    isActive ? 'text-amber' : 'text-dust'
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  <span className="max-w-full truncate px-0.5">{s.short}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
