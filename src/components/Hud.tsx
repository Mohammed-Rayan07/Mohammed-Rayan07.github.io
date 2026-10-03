import { TerminalSquare } from 'lucide-react'
import { sectors, survivor, type SectorId } from '../data/content'
import { countdownText } from '../lib/countdown'
import { scrollToSector, useNow } from '../lib/hooks'

export function Hud({ active, progress, onTerminal }: { active: SectorId; progress: number; onTerminal: () => void }) {
  const now = useNow()
  const left = countdownText(now)
  const index = sectors.findIndex((s) => s.id === active)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ash/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => scrollToSector('identity')}
          className="flex shrink-0 items-center gap-2.5 font-mono text-sm"
          aria-label="Back to the top of the archive"
        >
          <MazeMark />
          <span className="hidden text-bone sm:inline">The Last Portfolio</span>
          <span className="text-amber">{survivor.recordId}</span>
        </button>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 font-mono text-xs text-dust md:flex" aria-live="polite">
          <span className="text-dust-2">
            Sector {index + 1}/{sectors.length}
          </span>
          <span className="truncate text-bone">{sectors[index]?.label}</span>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 border border-alert/40 bg-alert/5 px-2.5 py-1 font-mono text-xs" title="Silicon Maze ends 18:00 IST, 4 October 2026">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-alert" aria-hidden="true" />
            {left ? (
              <>
                <span className="hidden text-dust lg:inline">Network collapse in</span>
                <span className="hidden text-dust sm:inline lg:hidden">Collapse</span>
                <span className="tabular-nums text-alert">{left}</span>
              </>
            ) : (
              <>
                <span className="text-alert lg:hidden">Offline</span>
                <span className="hidden text-alert lg:inline">Network offline. Archive preserved.</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onTerminal}
            className="flex items-center gap-2 border border-line-2 px-2.5 py-1 font-mono text-xs text-amber transition-colors hover:border-amber hover:bg-amber/10"
            aria-label="Open the archive terminal"
          >
            <TerminalSquare className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden border border-line-2 px-1 text-[0.65rem] text-dust lg:inline">/</kbd>
          </button>
        </div>
      </div>
      <div className="h-px bg-line" aria-hidden="true">
        <div className="h-px origin-left bg-amber shadow-[0_0_8px_var(--color-amber)]" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  )
}

export function MazeMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M2 2h20v20H2zM6 2v12h4M14 6h4v12M6 18h8v-8" stroke="var(--color-amber)" strokeWidth="1.6" strokeLinecap="square" />
      <rect x="10.5" y="10.5" width="3" height="3" fill="var(--color-alert)" />
    </svg>
  )
}
