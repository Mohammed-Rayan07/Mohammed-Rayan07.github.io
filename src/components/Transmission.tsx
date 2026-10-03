import { Check, Copy, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { links, survivor } from '../data/content'
import { useNow } from '../lib/hooks'
import { countdownText } from '../lib/countdown'
import { MazeMark } from './Hud'
import { SectionHeader } from './SectionHeader'
import { GitHubIcon, LinkedInIcon } from './SkillIcon'

const channels = [
  { id: 'email', label: 'Email', value: links.email, href: `mailto:${links.email}`, Icon: Mail, strength: 4 },
  { id: 'linkedin', label: 'LinkedIn', value: 'in/mohammed-rayan', href: links.linkedin, Icon: LinkedInIcon, strength: 4 },
  { id: 'github', label: 'GitHub', value: 'Mohammed-Rayan07', href: links.github, Icon: GitHubIcon, strength: 4 },
] as const

export function Transmission() {
  const now = useNow()
  const left = countdownText(now)
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  const transmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Transmission from the archive${name ? `: ${name}` : ''}`
    const body = `${message}\n\n${name ? `From ${name}` : ''}`
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`
  }

  return (
    <section id="transmission" aria-labelledby="transmission-title" className="relative border-t border-line bg-ash-2">
      <div className="hazard h-2 opacity-80" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-8 lg:py-28">
        <SectionHeader index={5} id="transmission" title="Final transmission">
          The archive is useless if nobody can reach the survivor. Every channel below is open, before the network goes dark and after.
        </SectionHeader>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="border border-alert/40 bg-alert/[0.04] p-5 sm:p-6">
              <p className="font-mono text-sm text-alert">{left ? 'Network collapse in' : 'Network status'}</p>
              <p className="mt-1 font-display text-[clamp(2.6rem,7vw,4.5rem)] font-extrabold tabular-nums leading-none text-bone">
                {left ?? 'Offline'}
              </p>
              <p className="mt-2 text-sm text-dust">
                {left ? 'Silicon Maze ends at 18:00 IST on 4 October. The channels stay open after.' : 'Doomsday came and went. The archive survived, and the channels are still open.'}
              </p>
            </div>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {channels.map(({ id, label, value, href, Icon, strength }) => (
                <li key={id} className="flex items-center gap-4 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line-2 text-amber">
                    <Icon className="h-5 w-5" />
                  </span>
                  <a
                    href={href}
                    target={id === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group min-w-0 flex-1"
                  >
                    <span className="block font-mono text-xs text-dust-2">{label}</span>
                    <span className="block break-all text-base text-bone underline decoration-line-2 underline-offset-4 group-hover:text-amber group-hover:decoration-amber sm:text-lg">
                      {value}
                    </span>
                  </a>
                  {id === 'email' ? (
                    <button
                      type="button"
                      onClick={copy}
                      className="flex shrink-0 items-center gap-1.5 border border-line-2 px-2.5 py-1.5 font-mono text-xs text-dust hover:border-amber hover:text-amber"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-signal" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                      <span aria-live="polite" className="sr-only sm:not-sr-only">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  ) : (
                    <span className="hidden shrink-0 items-end gap-0.5 sm:flex" aria-hidden="true">
                      {[1, 2, 3, 4].map((b) => (
                        <span key={b} className={`w-1 ${b <= strength ? 'bg-signal' : 'bg-line'}`} style={{ height: `${b * 4 + 2}px` }} />
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={transmit} className="housing flex flex-col p-5 sm:p-7" aria-labelledby="compose-title">
            <h3 id="compose-title" className="font-display text-2xl font-bold uppercase text-bone">
              Compose a transmission
            </h3>
            <p className="mt-1 text-sm text-dust">Opens in your own email app, addressed to me. Nothing is stored here.</p>
            <label htmlFor="tx-name" className="mt-6 font-mono text-xs text-dust">
              Your name
            </label>
            <input
              id="tx-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="mt-1.5 border border-line-2 bg-ash px-3 py-2.5 text-bone outline-none placeholder:text-dust-2 focus:border-amber"
              placeholder="Who is transmitting"
            />
            <label htmlFor="tx-msg" className="mt-4 font-mono text-xs text-dust">
              Message
            </label>
            <textarea
              id="tx-msg"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 min-h-36 flex-1 resize-y border border-line-2 bg-ash px-3 py-2.5 text-bone outline-none placeholder:text-dust-2 focus:border-amber"
              placeholder="A project, a role, a problem worth building a system for…"
            />
            <button type="submit" className="btn btn-primary mt-5 justify-center">
              <Send className="h-4 w-4" aria-hidden="true" />
              Open in email app
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-4 py-8 font-mono text-xs text-dust-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex items-center gap-2.5">
            <MazeMark className="h-5 w-5" />
            End of record {survivor.recordId}. Built by {survivor.name} for Silicon Maze 2026.
          </p>
          <p>
            Press <kbd className="border border-line-2 px-1 text-dust">/</kbd> for the archive terminal ·{' '}
            <a href="https://github.com/Mohammed-Rayan07/Mohammed-Rayan07.github.io" target="_blank" rel="noreferrer" className="text-dust underline underline-offset-4 hover:text-amber">
              Source
            </a>
          </p>
        </div>
      </footer>
    </section>
  )
}
