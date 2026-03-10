import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { aggregateWeekly, formatDownloads } from '../../utils/formatters'
import Card from '../ui/Card'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#111] border border-[#222] rounded-[6px] px-3 py-2">
      <p className="text-[#888] text-[11px] font-mono mb-0.5">{label}</p>
      <p className="text-[#ededed] text-[13px] font-mono font-medium">
        {formatDownloads(payload[0].value)}
      </p>
    </div>
  )
}

export default function DownloadChart({ downloads }) {
  const data  = aggregateWeekly(downloads?.downloads ?? [])
  const total = downloads?.downloads?.reduce((s, d) => s + d.downloads, 0) ?? 0

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] text-[#555] uppercase tracking-widest font-mono">
          Downloads
        </p>
        <span className="text-[#ededed] text-[13px] font-mono font-medium">
          {formatDownloads(total)}
          <span className="text-[#555] ml-1">/ month</span>
        </span>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="dlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0070f3" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="week"
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatDownloads}
            tick={{ fill: '#555', fontSize: 11, fontFamily: 'inherit' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="downloads"
            stroke="#0070f3"
            strokeWidth={1.5}
            fill="url(#dlGradient)"
            dot={false}
            activeDot={{ r: 3, fill: '#0070f3', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
