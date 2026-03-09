export const API = {
  NPM_REGISTRY: 'https://registry.npmjs.org',
  NPM_DOWNLOADS: 'https://api.npmjs.org/downloads/range',
  BUNDLEPHOBIA: 'https://bundlephobia.com/api/size',
  NPMS: 'https://api.npms.io/v2/package',
  GITHUB: 'https://api.github.com/repos',
}

export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export const DOWNLOAD_PERIOD = 'last-month'

export const HEALTH_THRESHOLDS = {
  STALE_MONTHS: 12,        
  HIGH_ISSUES: 100,        
  LARGE_BUNDLE_KB: 500,    
  DOWNLOAD_DROP: 0.3,      
}