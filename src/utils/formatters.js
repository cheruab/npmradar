import { formatDistanceToNow, parseISO } from 'date-fns'

// 11234 → "11 kB"
export function formatBytes(bytes) {
  if (!bytes) return 'N/A'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// 48000000 → "48M"
export function formatDownloads(num) {
  if (!num) return '0'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`
  return num.toString()
}

// ISO date string → "3 months ago"
export function timeAgo(dateString) {
  if (!dateString) return 'Unknown'
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return 'Unknown'
  }
}

// 0.91 → "91"
export function scoreToPercent(score) {
  if (score == null) return 0
  return Math.round(score * 100)
}

// total downloads array → weekly totals for chart
export function aggregateWeekly(downloads) {
  if (!downloads?.length) return []
  const weeks = []
  for (let i = 0; i < downloads.length; i += 7) {
    const week = downloads.slice(i, i + 7)
    const total = week.reduce((sum, d) => sum + d.downloads, 0)
    weeks.push({
      week: `Week ${Math.floor(i / 7) + 1}`,
      downloads: total,
    })
  }
  return weeks
}