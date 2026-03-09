import { useState, useCallback } from 'react'
import { fetchPackageInfo, fetchDownloads } from '../api/npm'
import { fetchBundleSize }                  from '../api/bundlephobia'
import { fetchNpmsScore }                   from '../api/npms'
import { fetchGithubRepo, parseRepoPath }   from '../api/github'
import { calculateHealth }                  from '../utils/healthScore'

export const usePackage = () => {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const lookup = useCallback(async (name) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      // Kick off all requests concurrently — npm info is required, rest are best-effort
      const [npm, downloads, npms] = await Promise.all([
        fetchPackageInfo(name),
        fetchDownloads(name),
        fetchNpmsScore(name),
      ])

      const repoPath = parseRepoPath(npm)
      const [bundle, github] = await Promise.all([
        fetchBundleSize(name, npm['dist-tags']?.latest),
        fetchGithubRepo(repoPath),
      ])

      const health = calculateHealth({ npm, npms, github, bundle })

      setData({ npm, downloads, npms, bundle, github, health })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, lookup }
}