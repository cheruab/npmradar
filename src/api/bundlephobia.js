import { API } from '../utils/constants'

export const fetchBundleSize = async (name, version = 'latest') => {
  const pkg = version === 'latest' ? name : `${name}@${version}`
  const res = await fetch(`${API.BUNDLEPHOBIA}?package=${encodeURIComponent(pkg)}`)
  if (!res.ok) return null  // non-fatal — some packages can't be bundled
  return res.json()
}