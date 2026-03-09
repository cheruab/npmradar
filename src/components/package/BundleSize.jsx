import { formatBytes } from '../../utils/formatters'
import Card from '../ui/Card'

export default function BundleSize({ bundle }) {
  if (!bundle) return (
    <Card>
      <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono mb-3">
        Bundle Size
      </p>
      <p className="text-[#555] text-[13px]">Not available for this package.</p>
    </Card>
  )

  const sizeKb = (bundle.size / 1024).toFixed(1)
  const gzipKb = (bundle.gzip / 1024).toFixed(1)
  const warning = bundle.size > 500 * 1024

  return (
    <Card>
      <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono mb-4">
        Bundle Size
      </p>

      <div className="flex items-end gap-1 mb-1">
        <span className={`text-[28px] font-semibold tracking-tight ${warning ? 'text-[#ef4444]' : 'text-[#ededed]'}`}>
          {sizeKb}
        </span>
        <span className="text-[#555] text-[13px] mb-1 font-mono">kB</span>
        <span className="text-[#555] text-[13px] mb-1 ml-2 font-mono">
          minified
        </span>
      </div>

      <p className="text-[#888] text-[12px] font-mono">
        {gzipKb} kB <span className="text-[#555]">gzipped</span>
      </p>

      {warning && (
        <p className="mt-3 text-[#ef4444] text-[11px] font-mono">
          ⚠ Large bundle — consider a lighter alternative
        </p>
      )}
    </Card>
  )
}