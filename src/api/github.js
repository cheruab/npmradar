import { API, GITHUB_TOKEN } from '../utils/constants'

const headers = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {}

export const fetchGithubRepo = async (repoPath) => {
  if (!repoPath) return null
  const res = await fetch(`${API.GITHUB}/${repoPath}`, { headers })
  if (!res.ok) return null
  return res.json()
}

// Extract "owner/repo" from various URL formats npm packages use
export const parseRepoPath = (npmData) => {
  const url =
    npmData?.repository?.url ||
    npmData?.repository ||
    ''

  const match = String(url).match(/github\.com[/:]([^/]+\/[^/.]+)/)
  return match ? match[1].replace(/\.git$/, '') : null
}