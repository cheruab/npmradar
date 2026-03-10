import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { formatDownloads } from '../../utils/formatters'
import Card from '../ui/Card'

const PERIODS = [
  { label: '1 Month',   value: '1M'  },
  { label: '3 Months',  value: '3M'  },
  { label: '6 Months',  value: '6M'  },
  { label: '1 Year',    value: '1Y'  },
  { label: '18 Months', value: '18M' },
]

const PERIOD_TITLE = {
  '1M':  { title: 'Monthly Downloads',    sub: 'last 1 month'   },
  '3M':  { title: 'Downloads (3 Months)', sub: 'last 3 months'  },
  '6M':  { title: 'Downloads (6 Months)', sub: 'last 6 months'  },
  '1Y':  { title: 'Yearly Downloads',     sub: 'last 12 months' },
  '18M': { title: 'Downloads (18 Months)',sub: 'last 18 months' },
}

const toWeekly = (downloads = []) => {
  const weeks = []
  for (let i = 0; i < downloads.length; i += 7) {
    const chunk = downloads.slice(i, i + 7)
    if (!chunk.length) continue
    weeks.push({
      date:      chunk[0].day,
      label:     format(parseISO(chunk[0].day), 'MMM d'),
      downloads: chunk.reduce((sum, d) => sum + d.downloads, 0),
    })
  }
  return weeks
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { label, downloads } = payload[0].payload
  return (
    <div style={{
      background: '#111', border: '1px solid #222',
      borderRadius: '6px', padding: '10px 14px',
    }}>
      <p style={{ color: '#555', fontSize: '11px', fontFamily: 'monospace', marginBottom: '4px' }}>
        {label}
      </p>
      <p style={{ color: '#ededed', fontSize: '14px', fontFamily: 'monospace', fontWeight: 600 }}>
        {formatDownloads(downloads)}
      </p>
      <p style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace', marginTop: '2px' }}>
        downloads this week
      </p>
    </div>
  )
}

export default function DownloadChart({ downloads, period, onPeriodChange, chartLoading }) {
  const raw   = downloads?.downloads ?? []
  const data  = toWeekly(raw)
  const total = raw.reduce((s, d) => s + d.downloads, 0)

  const { title, sub } = PERIOD_TITLE[period] ?? PERIOD_TITLE['1M']

  return (
    <Card>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px', gap: '16px', flexWrap: 'wrap',
      }}>
        <div>
          <p style={{
            color: '#555', fontSize: '11px', fontFamily: 'monospace',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px',
          }}>
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <p style={{
              color: '#ededed', fontSize: '26px', fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1,
              fontFamily: 'monospace',
            }}>
              {formatDownloads(total)}
            </p>
            <span style={{ color: '#555', fontSize: '12px', fontFamily: 'monospace' }}>
              {sub}
            </span>
          </div>
        </div>

        {/* Period tab group */}
        <div style={{
          display: 'flex', background: '#111',
          borderRadius: '6px', padding: '3px',
          border: '1px solid #1a1a1a',
        }}>
          {PERIODS.map(({ label, value }) => {
            const active = period === value
            return (
              <button
                key={value}
                onClick={() => !chartLoading && onPeriodChange?.(value)}
                style={{
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  fontWeight: active ? 600 : 400,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: chartLoading ? 'wait' : 'pointer',
                  transition: 'all 0.15s',
                  background: active ? '#0070f3' : 'transparent',
                  color:      active ? '#fff'    : '#555',
                  opacity:    chartLoading && !active ? 0.4 : 1,
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chart area */}
      <div style={{ position: 'relative' }}>
        {chartLoading && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)', borderRadius: '4px',
          }}>
            <p style={{ color: '#555', fontSize: '12px', fontFamily: 'monospace' }}>
              Loading...
            </p>
          </div>
        )}

        {data.length === 0 ? (
          <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#333', fontSize: '12px', fontFamily: 'monospace' }}>
              No data for this period
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 8, right: 4, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0070f3" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0070f3" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#111" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                tickFormatter={formatDownloads}
                tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                width={42}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#222', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="downloads"
                stroke="#0070f3"
                strokeWidth={2}
                fill="url(#dlGrad)"
                dot={false}
                activeDot={{ r: 5, fill: '#0070f3', stroke: '#000', strokeWidth: 2 }}
                isAnimationActive={!chartLoading}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}