import { DOOMSDAY } from '../data/content'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function countdownParts(now: number) {
  const ms = DOOMSDAY.getTime() - now
  if (ms <= 0) return null
  const s = Math.floor(ms / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}

export function countdownText(now: number) {
  const c = countdownParts(now)
  if (!c) return null
  const hours = c.d * 24 + c.h
  return `${pad(hours)}:${pad(c.m)}:${pad(c.s)}`
}
