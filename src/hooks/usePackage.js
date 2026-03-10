// src/hooks/usePackage.js
import { useState, useCallback } from 'react'
import { fetchPackageInfo, fetchDownloads } from '../api/npm'
import { fetchBundleSize }                  from '../api/bundlephobia'
import { fetchNpmsScore }                   from '../api/npms'
import { fetchGithubRepo, parseRepoPath }   from '../api/github'
import { calculateHealth }                  from '../utils/healthScore'

export const PERIODS = ['1M', '3M', '6M', '1Y', '18M']

export const usePackage = () => {
  const [data,        setData]        = useState(null)
  const [loading,     setLoading]     = useState(false)
  const [chartLoading,setChartLoading]= useState(false)
  const [error,       setError]       = useState(null)
  const [period,      setPeriod]      = useState('1M')
  const [packageName, setPackageName] = useState('')

  const lookup = useCallback(async (name) => {
    setLoading(true)
    setError(null)
    setData(null)
    setPackageName(name)

    try {
      const [npm, downloads, npms] = await Promise.all([
        fetchPackageInfo(name),
        fetchDownloads(name, '1M'),
        fetchNpmsScore(name).catch(() => null),
      ])

      const [bundle, github] = await Promise.all([
        fetchBundleSize(name, npm.version).catch(() => null),
        fetchGithubRepo(parseRepoPath(npm)).catch(() => null),
      ])

      setData({
        npm,
        downloads,
        npms,
        bundle,
        github,
        health: calculateHealth({ npm, npms, github, bundle }),
      })
      setPeriod('1M')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Only refetches the chart — does not reload the whole page
  const changePeriod = useCallback(async (newPeriod) => {
    if (!packageName) return
    setPeriod(newPeriod)
    setChartLoading(true)
    try {
      const downloads = await fetchDownloads(packageName, newPeriod)
      setData(prev => ({ ...prev, downloads }))
    } finally {
      setChartLoading(false)
    }
  }, [packageName])

  return { data, loading, chartLoading, error, lookup, period, changePeriod }
}