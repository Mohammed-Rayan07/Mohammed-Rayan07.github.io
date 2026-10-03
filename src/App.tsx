import { useCallback, useEffect, useState } from 'react'
import { Archives } from './components/Archives'
import { Arsenal } from './components/Arsenal'
import { Boot } from './components/Boot'
import { Hero } from './components/Hero'
import { Hud } from './components/Hud'
import { MazeNav } from './components/MazeNav'
import { RecordFile } from './components/RecordFile'
import { SurvivorLog } from './components/SurvivorLog'
import { Terminal } from './components/Terminal'
import { Transmission } from './components/Transmission'
import { projectById } from './data/content'
import type { ArchiveFilter } from './lib/archive'
import { scrollToSector, storage, useActiveSector } from './lib/hooks'

const BOOT_KEY = 'archive-booted'

function recordFromHash() {
  const m = window.location.hash.match(/^#archives\/([\w-]+)$/)
  return m && projectById[m[1]] ? m[1] : null
}

export default function App() {
  const [booting, setBooting] = useState(() => storage.get(BOOT_KEY) !== '1' && !recordFromHash())
  const [terminal, setTerminal] = useState(false)
  const [record, setRecord] = useState<string | null>(() => recordFromHash())
  const [skill, setSkill] = useState<string | null>(null)
  const [filter, setFilter] = useState<ArchiveFilter>({ kind: 'all' })
  const { active, progress } = useActiveSector()

  const finishBoot = useCallback(() => {
    storage.set(BOOT_KEY, '1')
    setBooting(false)
  }, [])

  const openRecord = useCallback((id: string) => {
    setRecord(id)
    history.replaceState(null, '', `#archives/${id}`)
  }, [])

  const closeRecord = useCallback(() => {
    setRecord(null)
    history.replaceState(null, '', '#archives')
  }, [])

  const closeTerminal = useCallback(() => setTerminal(false), [])

  // "/" or "`" opens the terminal from anywhere except text fields.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable
      if (typing || booting || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '/' || e.key === '`') {
        e.preventDefault()
        setTerminal(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booting])

  // Deep links to a sector (#arsenal) land correctly after the first render.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && !id.includes('/') && document.getElementById(id)) setTimeout(() => scrollToSector(id), 50)
  }, [])

  const traceInArchives = (skillId: string) => {
    setFilter({ kind: 'skill', id: skillId })
    scrollToSector('archives')
  }

  return (
    <div className="crt min-h-screen">
      <a
        href="#archives"
        className="fixed left-3 top-3 z-[110] -translate-y-20 bg-amber px-3 py-2 font-mono text-sm text-ash focus:translate-y-0"
      >
        Skip to the projects
      </a>

      {booting && <Boot onDone={finishBoot} />}

      <Hud active={active} progress={progress} onTerminal={() => setTerminal(true)} />
      <MazeNav active={active} progress={progress} />

      <main className="pb-[60px] lg:pb-0 lg:pl-[84px]">
        <Hero ready={!booting} />
        <SurvivorLog onOpenProject={openRecord} />
        <Arsenal selected={skill} onSelect={setSkill} onOpenProject={openRecord} onTraceInArchives={traceInArchives} />
        <Archives filter={filter} onFilter={setFilter} onOpen={openRecord} />
        <Transmission />
      </main>

      <RecordFile id={record} onClose={closeRecord} onNavigate={openRecord} />
      <Terminal open={terminal} onClose={closeTerminal} onOpenProject={openRecord} />
    </div>
  )
}
