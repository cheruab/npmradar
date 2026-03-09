import { API, DOWNLOAD_PERIOD } from '../utils/constants'

export const fetchPackageInfo = async (name) => {
  const res = await fetch(`${API.NPM_REGISTRY}/${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error(`Package "${name}" not found`)
  return res.json()
}

export const fetchDownloads = async (name) => {
  const res = await fetch(`${API.NPM_DOWNLOADS}/${DOWNLOAD_PERIOD}/${encodeURIComponent(name)}`)
  if (!res.ok) throw new Error('Failed to fetch download stats')
  return res.json()
}