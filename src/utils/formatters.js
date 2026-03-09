import { formatDistanceToNow, parseISO } from 'date-fns'

export const formatBytes = (bytes) => {
  if (!bytes) return 'N/A'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const formatDownloads = (n) => {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export const timeAgo = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return 'Unknown'
  }
}

export const scoreToPercent = (score) =>
  score == null ? 0 : Math.round(score * 100)

export const aggregateWeekly = (downloads = []) => {
  const weeks = []
  for (let i = 0; i < downloads.length; i += 7) {
    const chunk = downloads.slice(i, i + 7)
    weeks.push({
      week:      `Wk ${Math.floor(i / 7) + 1}`,
      downloads: chunk.reduce((sum, d) => sum + d.downloads, 0),
    })
  }
  return weeks
}