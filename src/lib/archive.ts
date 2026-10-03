import { projects, skillById, type Project } from '../data/content'

export type ArchiveFilter = { kind: 'all' } | { kind: 'tag'; id: TagId } | { kind: 'skill'; id: string }

export type TagId = 'agents' | 'voice' | 'hackathon' | 'live'

export const TAGS: { id: TagId; label: string; test: (p: Project) => boolean }[] = [
  { id: 'agents', label: 'AI agents', test: (p) => p.stack.includes('agents') },
  { id: 'voice', label: 'Voice AI', test: (p) => p.stack.some((s) => ['vapi', 'eleven', 'turns', 'webaudio'].includes(s)) },
  { id: 'hackathon', label: 'Hackathons', test: (p) => /Silicon|Build for Billions|Buildathon/.test(p.event) },
  { id: 'live', label: 'Live now', test: (p) => Boolean(p.live) },
]

export function filterProjects(f: ArchiveFilter) {
  if (f.kind === 'all') return projects
  if (f.kind === 'skill') return projects.filter((p) => p.stack.includes(f.id) || skillById[f.id]?.projects.includes(p.id))
  const tag = TAGS.find((t) => t.id === f.id)!
  return projects.filter(tag.test)
}

export const statusTone: Record<Project['status'], string> = {
  Operational: 'text-signal border-signal/50',
  Live: 'text-signal border-signal/50',
  'Field-tested': 'text-amber border-amber/50',
  Archived: 'text-dust border-line-2',
}
