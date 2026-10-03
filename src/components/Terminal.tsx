import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { arsenal, dossier, fieldRecord, links, log, projects, sectors, survivor } from '../data/content'
import { scrollToSector } from '../lib/hooks'
import { countdownText } from '../lib/countdown'

type Line = { kind: 'in' | 'out' | 'dim' | 'err' | 'hi'; text: string }

const COMMANDS: Record<string, string> = {
  help: 'list commands',
  whoami: 'identify the survivor',
  story: 'where I came from',
  log: 'dated log entries',
  record: 'field record and wins',
  skills: 'skills [category], e.g. skills voice',
  projects: 'list archive records',
  open: 'open <record>, e.g. open jarvis or open ADV-02',
  goto: 'goto <sector>: identity, log, arsenal, archives, transmission',
  contact: 'every open channel',
  email: 'compose an email',
  linkedin: 'open LinkedIn',
  github: 'open GitHub',
  status: 'archive status and countdown',
  clear: 'clear the screen',
  exit: 'close the terminal',
}

function findProject(q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return undefined
  return projects.find((p) => p.id === s || p.code.toLowerCase() === s) ?? projects.find((p) => p.name.toLowerCase().includes(s) || p.id.includes(s))
}

function findSector(q: string) {
  const s = q.trim().toLowerCase().replace(/^#/, '')
  return sectors.find((x) => x.id === s || x.label.toLowerCase().startsWith(s))
}

const BANNER: Line[] = [
  { kind: 'hi', text: `Archive terminal · record ${survivor.recordId}` },
  { kind: 'dim', text: 'Type help to list commands. Tab completes, arrow keys recall history.' },
]

export function Terminal({ open, onClose, onOpenProject }: { open: boolean; onClose: () => void; onOpenProject: (id: string) => void }) {
  const [lines, setLines] = useState<Line[]>(BANNER)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const run = (raw: string) => {
    const cmdline = raw.trim()
    const out: Line[] = [{ kind: 'in', text: cmdline }]
    const [cmd, ...rest] = cmdline.split(/\s+/)
    const arg = rest.join(' ')
    const say = (text: string, kind: Line['kind'] = 'out') => out.push({ kind, text })

    switch ((cmd ?? '').toLowerCase()) {
      case '':
        break
      case 'help':
      case '?':
        Object.entries(COMMANDS).forEach(([k, v]) => say(`${k.padEnd(10)} ${v}`))
        break
      case 'whoami':
        say(`${survivor.name} (${survivor.callsign})`, 'hi')
        say(`${survivor.designation} · ${survivor.role}`)
        say(`${survivor.base} · origin ${survivor.origin}`)
        say(`function: ${survivor.primaryFunction.toLowerCase()}`)
        say(`interests: ${survivor.interests.join(', ').toLowerCase()}`)
        say(`principle: "${survivor.principle}"`, 'dim')
        break
      case 'story':
      case 'about':
        say('Grew up in Riyadh, Saudi Arabia. Moved to India for AI engineering at NITK Surathkal.')
        say('Learning about technology was not enough. I wanted to build with it and turn ideas into products.')
        say(dossier.lesson.join(' '), 'dim')
        break
      case 'log':
        log.forEach((e) => say(`${e.stamp.padEnd(15)} ${e.title}`))
        break
      case 'record':
      case 'achievements':
        fieldRecord.forEach((f) => say(`[${(f.badge ?? '').padEnd(7)}] ${f.title}`))
        break
      case 'skills':
      case 'arsenal': {
        const q = arg.toLowerCase()
        const cat = q ? arsenal.find((c) => c.id === q || c.name.toLowerCase().includes(q)) : undefined
        if (q && !cat) {
          say(`no category "${arg}". Try: ${arsenal.map((c) => c.id).join(', ')}`, 'err')
        } else if (cat) {
          say(cat.name, 'hi')
          cat.skills.forEach((s) => say(`  ${s.name.padEnd(28)} ${s.projects.length ? `${s.projects.length} record(s)` : 'client work'}`))
        } else {
          arsenal.forEach((c) => say(`${c.id.padEnd(6)} ${c.name.padEnd(28)} ${c.skills.length} tools`))
          say('skills <id> lists a category.', 'dim')
        }
        break
      }
      case 'projects':
      case 'ls':
        projects.forEach((p) => say(`${p.code}  ${p.name.padEnd(36)} ${p.status}`))
        say('open <name or code> opens a record.', 'dim')
        break
      case 'open':
      case 'cat': {
        const p = findProject(arg)
        if (!p) {
          say(arg ? `no record matches "${arg}". Type projects to list them.` : 'usage: open <record>', 'err')
        } else {
          say(`opening ${p.code} ${p.name}…`, 'hi')
          setTimeout(() => {
            onClose()
            onOpenProject(p.id)
          }, 250)
        }
        break
      }
      case 'goto':
      case 'cd': {
        const s = findSector(arg)
        if (!s) say(`unknown sector. Try: ${sectors.map((x) => x.id).join(', ')}`, 'err')
        else {
          say(`moving to ${s.label}…`, 'hi')
          setTimeout(() => {
            onClose()
            scrollToSector(s.id)
          }, 200)
        }
        break
      }
      case 'contact':
        say(`email     ${links.email}`)
        say(`linkedin  ${links.linkedin}`)
        say(`github    ${links.github}`)
        break
      case 'email':
      case 'mail':
        say('opening your email app…', 'hi')
        window.location.href = `mailto:${links.email}`
        break
      case 'linkedin':
        say('opening LinkedIn in a new tab…', 'hi')
        window.open(links.linkedin, '_blank', 'noopener')
        break
      case 'github':
        say('opening GitHub in a new tab…', 'hi')
        window.open(links.github, '_blank', 'noopener')
        break
      case 'status':
      case 'countdown': {
        const left = countdownText(Date.now())
        say(`survivor: ${survivor.status.join(' / ').toLowerCase()}`)
        say(left ? `network collapse in ${left}` : 'network offline. archive preserved.', left ? 'err' : 'hi')
        say(`records: ${projects.length} · integrity 97.3%`)
        break
      }
      case 'hire':
      case 'recruit':
        say('Good call. Opening the transmission channel…', 'hi')
        setTimeout(() => {
          onClose()
          scrollToSector('transmission')
        }, 300)
        break
      case 'sudo':
        say('permission denied: this archive is read-only. nice try.', 'err')
        break
      case 'rm':
        say('refused. this is the last copy.', 'err')
        break
      case 'date':
        say(new Date().toString())
        break
      case 'echo':
        say(arg)
        break
      case 'history':
        history.forEach((h, i) => say(`${String(i + 1).padStart(3)}  ${h}`))
        break
      case 'clear':
        setLines([])
        return
      case 'exit':
      case 'quit':
      case 'q':
        onClose()
        return
      default:
        say(`command not found: ${cmd}. Type help.`, 'err')
    }
    setLines((l) => [...l, ...out])
  }

  const complete = () => {
    const parts = input.split(/\s+/)
    if (parts.length <= 1) {
      const m = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0].toLowerCase()))
      if (m.length === 1) setInput(m[0] + ' ')
      else if (m.length > 1) setLines((l) => [...l, { kind: 'dim', text: m.join('  ') }])
      return
    }
    const [cmd, ...rest] = parts
    const q = rest.join(' ').toLowerCase()
    const pool =
      cmd === 'open' || cmd === 'cat'
        ? projects.map((p) => p.id)
        : cmd === 'goto' || cmd === 'cd'
          ? sectors.map((s) => s.id)
          : cmd === 'skills'
            ? arsenal.map((c) => c.id)
            : []
    const m = pool.filter((x) => x.startsWith(q))
    if (m.length === 1) setInput(`${cmd} ${m[0]}`)
    else if (m.length > 1) setLines((l) => [...l, { kind: 'dim', text: m.join('  ') }])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim()) setHistory((h) => [...h, input.trim()])
      setHIndex(-1)
      run(input)
      setInput('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const i = hIndex < 0 ? history.length - 1 : Math.max(0, hIndex - 1)
      setHIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIndex < 0) return
      const i = hIndex + 1
      if (i >= history.length) {
        setHIndex(-1)
        setInput('')
      } else {
        setHIndex(i)
        setInput(history[i])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const tone: Record<Line['kind'], string> = {
    in: 'text-bone',
    out: 'text-bone/85',
    dim: 'text-dust-2',
    err: 'text-alert',
    hi: 'text-amber',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 backdrop-blur-[2px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Archive terminal"
            className="housing flex h-[78vh] w-full max-w-3xl flex-col bg-ash sm:h-[70vh]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.focus()
            }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 font-mono text-xs">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 bg-alert" />
                <span className="h-2.5 w-2.5 bg-amber" />
                <span className="h-2.5 w-2.5 bg-signal" />
              </span>
              <span className="text-dust">survivor@archive-07: ~</span>
              <button type="button" onClick={onClose} className="ml-auto flex items-center gap-1 text-dust hover:text-amber">
                <X className="h-4 w-4" aria-hidden="true" /> Close
              </button>
            </div>
            <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto px-4 py-3 font-mono text-[0.8rem] leading-6 sm:text-sm" aria-live="polite">
              {lines.map((l, i) => (
                <div key={i} className={`whitespace-pre-wrap break-words ${tone[l.kind]}`}>
                  {l.kind === 'in' && <span className="text-amber">› </span>}
                  {l.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-sm">
              <label htmlFor="term-input" className="text-amber">
                ›<span className="sr-only">Command</span>
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-bone caret-amber outline-none placeholder:text-dust-2"
                placeholder="try: whoami, projects, open advocall"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-2.5">
              {['whoami', 'projects', 'skills', 'record', 'contact'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => run(c)}
                  className="border border-line-2 px-2 py-0.5 font-mono text-xs text-dust hover:border-amber hover:text-amber"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
