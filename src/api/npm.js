import { format, subMonths, subYears } from 'date-fns'

const today = () => format(new Date(), 'yyyy-MM-dd')

const periodToRange = (period) => {
  const end = new Date()
  const ranges = {
    '1M':  format(subMonths(end, 1),  'yyyy-MM-dd'),
    '3M':  format(subMonths(end, 3),  'yyyy-MM-dd'),
    '6M':  format(subMonths(end, 6),  'yyyy-MM-dd'),
    '1Y':  format(subYears(end, 1),   'yyyy-MM-dd'),
    '18M': format(subMonths(end, 18), 'yyyy-MM-dd'),
  }
  return ranges[period] ?? ranges['1M']
}

export const fetchPackageInfo = async (name) => {
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/latest`)
  if (!res.ok) throw new Error(`Package "${name}" not found`)
  return res.json()
}

export const fetchDownloads = async (name, period = '1M') => {
  const start = periodToRange(period)
  const end   = today()
  const res   = await fetch(
    `https://api.npmjs.org/downloads/range/${start}:${end}/${encodeURIComponent(name)}`
  )
  if (!res.ok) return null
  return res.json()
}