import {
  siClaude,
  siDrizzle,
  siElevenlabs,
  siGithub,
  siGooglecalendar,
  siJavascript,
  siMake,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVercel,
  siVitest,
  siWhatsapp,
} from 'simple-icons'
import {
  AudioLines,
  Bot,
  Brain,
  CircleCheck,
  Contact,
  Database,
  Filter,
  Mic,
  Phone,
  PhoneCall,
  Plug,
  Shield,
  TrendingUp,
  Webhook,
  type LucideIcon,
} from 'lucide-react'

const glyphs: Record<string, LucideIcon> = {
  database: Database,
  brain: Brain,
  bot: Bot,
  check: CircleCheck,
  shield: Shield,
  trend: TrendingUp,
  phone: Phone,
  phoneCall: PhoneCall,
  audio: AudioLines,
  mic: Mic,
  webhook: Webhook,
  contacts: Contact,
  plug: Plug,
  funnel: Filter,
}

// Named imports only, so the bundle carries these paths and not all of simple-icons.
const brands: Record<string, { path: string }> = {
  siClaude,
  siDrizzle,
  siElevenlabs,
  siGithub,
  siGooglecalendar,
  siJavascript,
  siMake,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVercel,
  siVitest,
  siWhatsapp,
}

export function SkillIcon({ icon, glyph, className = 'h-5 w-5' }: { icon?: string; glyph?: string; className?: string }) {
  if (icon) {
    const data = brands[icon]
    if (data) {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d={data.path} />
        </svg>
      )
    }
  }
  const G = (glyph && glyphs[glyph]) || Bot
  return <G className={className} strokeWidth={1.6} aria-hidden="true" />
}

/** LinkedIn is not in simple-icons, so it is drawn here. */
export function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function GitHubIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  )
}
