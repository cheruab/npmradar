import { HEALTH_THRESHOLDS } from './constants'
import { parseISO, differenceInMonths } from 'date-fns'

export function calculateHealthScore(data) {
  const { npm, npms, github, bundle } = data
  let score = 100
  const flags = []

  // ── Maintenance ──────────────────────────────
  const lastPublish = npm?.time?.modified
  if (lastPublish) {
    const monthsOld = differenceInMonths(new Date(), parseISO(lastPublish))
    if (monthsOld > HEALTH_THRESHOLDS.STALE_MONTHS) {
      score -= 20
      flags.push(`Not updated in ${monthsOld} months`)
    }
  }

  // ── Issues ────────────────────────────────────
  if (github?.open_issues_count > HEALTH_THRESHOLDS.HIGH_ISSUES) {
    score -= 15
    flags.push(`${github.open_issues_count} open issues`)
  }

  // ── Bundle size ───────────────────────────────
  if (bundle?.size > HEALTH_THRESHOLDS.LARGE_BUNDLE_KB * 1024) {
    score -= 15
    flags.push(`Large bundle: ${(bundle.size / 1024).toFixed(0)}kB`)
  }

  // ── npms.io quality score ─────────────────────
  const quality = npms?.score?.detail?.quality ?? 0
  if (quality < 0.5) {
    score -= 20
    flags.push('Low quality score on npms.io')
  }

  // ── No GitHub repo ────────────────────────────
  if (!github) {
    score -= 10
    flags.push('No GitHub repository linked')
  }

  score = Math.max(0, Math.min(100, score))

  return {
    score,
    flags,
    label: score >= 80 ? 'Healthy' : score >= 50 ? 'Aging' : 'Risky',
    color: score >= 80 ? 'green' : score >= 50 ? 'yellow' : 'red',
  }
}