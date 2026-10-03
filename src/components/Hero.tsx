import { Mail } from 'lucide-react'
import { motion } from 'motion/react'
import { links, stats, survivor } from '../data/content'
import { scrollToSector } from '../lib/hooks'
import { Decode } from './Decode'
import { MazeCanvas } from './MazeCanvas'
import { GitHubIcon, LinkedInIcon } from './SkillIcon'

export function Hero({ ready }: { ready: boolean }) {
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] as const },
  })

  return (
    <section id="identity" aria-labelledby="identity-title" className="relative isolate overflow-hidden border-b border-line pt-14">
      <div className="absolute inset-0 -z-10">
        <MazeCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgb(15_12_8/0.86)_0%,rgb(15_12_8/0.55)_45%,rgb(15_12_8/0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ash to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] gap-12 px-4 pb-14 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14 lg:pb-20 lg:pt-20 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="@container min-w-0">
          <motion.p {...enter(0)} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-amber">
            <span className="hazard h-2 w-8 shrink-0" aria-hidden="true" />
            Survivor record {survivor.recordId} recovered
          </motion.p>

          <h1 id="identity-title" className="mt-6 font-stencil font-black uppercase leading-[0.82] text-bone">
            <span className="block text-[clamp(3.4rem,19cqi,9.5rem)] tracking-[0.01em]">
              <Decode text={survivor.firstName} start={ready} duration={700} />
            </span>
            <span className="glow block text-[clamp(3.4rem,19cqi,9.5rem)] tracking-[0.01em] text-amber">
              <Decode text={survivor.lastName} start={ready} duration={1000} />
            </span>
          </h1>

          <motion.p {...enter(0.25)} className="mt-7 max-w-[34ch] font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight text-bone">
            {survivor.primaryFunction}.
          </motion.p>

          <motion.p {...enter(0.35)} className="mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed text-dust">
            <span className="text-bone">AI engineer and builder</span>, studying B.Tech Artificial Intelligence at NITK Surathkal (2nd year). {survivor.intro}
          </motion.p>

          <motion.div {...enter(0.45)} className="mt-7">
            <h2 className="font-mono text-xs text-dust-2">Areas of interest</h2>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {survivor.interests.map((k) => (
                <li key={k} className="chip border-amber-deep text-bone">
                  <span className="h-1 w-1 bg-amber" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...enter(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollToSector('archives')}>
              Open the archives
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSector('transmission')}>
              Send a transmission
            </button>
            <div className="flex items-center gap-1 sm:ml-2">
              <a href={links.github} target="_blank" rel="noreferrer" className="p-2.5 text-dust transition-colors hover:text-amber" aria-label="GitHub profile">
                <GitHubIcon />
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="p-2.5 text-dust transition-colors hover:text-amber" aria-label="LinkedIn profile">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${links.email}`} className="p-2.5 text-dust transition-colors hover:text-amber" aria-label={`Email ${links.email}`}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -1.5, y: 24 }}
          animate={ready ? { opacity: 1, rotate: 0, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto w-full max-w-[420px] lg:mx-0 lg:mt-4"
        >
          <IdCard />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 pb-14 sm:px-8">
        <dl className="grid grid-cols-2 border border-line bg-ash/70 backdrop-blur-sm md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col px-5 py-5 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="order-2 mt-1 text-sm leading-snug text-dust">{s.label}</dt>
              <dd className="order-1 font-display text-4xl font-extrabold text-amber">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function IdCard() {
  const rows: [string, string][] = [
    ['Designation', 'AI engineer / builder'],
    ['Affiliation', 'NITK Surathkal'],
    ['Programme', 'B.Tech AI, 2nd year'],
    ['Origin', survivor.origin],
  ]

  return (
    <article className="housing p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]" aria-label="Survivor identity card">
      <header className="flex items-center justify-between font-mono text-xs">
        <span className="text-amber">Survivor profile</span>
        <span className="text-dust">{survivor.recordId}</span>
      </header>

      <div className="mt-4 grid grid-cols-[132px_1fr] gap-4 sm:grid-cols-[150px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden border border-line-2 bg-ash">
          <img
            src={survivor.photo}
            alt="Portrait of Mohammad Rayan"
            width={460}
            height={460}
            className="h-full w-full object-cover object-[50%_25%] [filter:grayscale(1)_contrast(1.15)_brightness(0.95)]"
          />
          <div className="absolute inset-0 bg-amber mix-blend-multiply" aria-hidden="true" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgb(0_0_0/0.25)_3px)]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-amber/25 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-1.5 left-1.5 bg-ash/80 px-1 font-mono text-[0.6rem] text-amber">ID verified</span>
        </div>

        <div className="min-w-0">
          <p className="font-stencil text-[2.1rem] font-extrabold uppercase leading-none text-bone">{survivor.callsign}</p>
          <p className="mt-1 text-sm text-dust">{survivor.name}</p>
          <p className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-signal" aria-hidden="true" />
            {survivor.status.map((s, i) => (
              <span key={s} className="text-signal">
                {s}
                {i < survivor.status.length - 1 && <span className="ml-1.5 text-dust-2">/</span>}
              </span>
            ))}
          </p>
        </div>
      </div>

      <dl className="mt-5 divide-y divide-line border-y border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2">
            <dt className="font-mono text-xs text-dust-2">{k}</dt>
            <dd className="text-right text-sm text-bone">{v}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-4">
        <figcaption className="font-mono text-xs text-dust-2">Operating principle</figcaption>
        <blockquote className="mt-1 font-display text-xl font-bold leading-snug text-amber">“{survivor.principle}”</blockquote>
      </figure>

      <footer className="mt-5 flex items-end justify-between gap-4">
        <Barcode />
        <span className="font-mono text-[0.65rem] text-dust-2">Silicon Maze 2026</span>
      </footer>
    </article>
  )
}

function Barcode() {
  // Deterministic bars derived from the record id.
  const widths = 'MR07RAYANNITKAI'.split('').flatMap((c) => {
    const n = c.charCodeAt(0)
    return [1 + (n % 3), 1 + ((n >> 2) % 2)]
  })
  const xs = widths.map((_, i) => widths.slice(0, i).reduce((sum, w) => sum + w + 0.6, 0))
  return (
    <svg viewBox="0 0 100 24" className="h-7 w-32" aria-hidden="true">
      {widths.map((w, i) => (i % 2 === 0 ? <rect key={i} x={xs[i]} y={0} width={w} height={24} fill="var(--color-bone)" opacity={0.75} /> : null))}
    </svg>
  )
}
