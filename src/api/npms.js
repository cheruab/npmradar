import { API } from '../utils/constants'

export const fetchNpmsScore = async (name) => {
  const res = await fetch(`${API.NPMS}/${encodeURIComponent(name)}`)
  if (!res.ok) return null
  return res.json()
}