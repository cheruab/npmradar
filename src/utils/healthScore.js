import { differenceInMonths, parseISO } from 'date-fns'
import { HEALTH } from './constants'

export const calculateHealth = ({ npm, npms, github, bundle }) => {
  let score = 100
  const flags = []

  const lastPublish = npm?.time?.modified
  if (lastPublish) {
    const age = differenceInMonths(new Date(), parseISO(lastPublish))
    if (age > HEALTH.STALE_MONTHS) {
      score -= 20
      flags.push(`Last published ${age} months ago`)
    }
  }

  if (github?.open_issues_count > HEALTH.HIGH_ISSUES) {
    score -= 15
    flags.push(`${github.open_issues_count} open issues`)
  }

  if (bundle?.size > HEALTH.LARGE_BUNDLE_KB * 1024) {
    score -= 15
    flags.push(`Bundle size ${(bundle.size / 1024).toFixed(0)} kB`)
  }

  const quality = npms?.score?.detail?.quality ?? 1
  if (quality < 0.5) {
    score -= 20
    flags.push('Low quality score')
  }

  if (!github) {
    score -= 10
    flags.push('No linked GitHub repo')
  }

  score = Math.max(0, Math.min(100, score))

  return {
    score,
    flags,
    label: score >= 80 ? 'Healthy' : score >= 50 ? 'Aging'   : 'Risky',
    color: score >= 80 ? 'green'   : score >= 50 ? 'yellow'  : 'red',
  }
}