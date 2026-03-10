// src/components/package/SearchBar.jsx
import { useState, useEffect, useRef } from 'react'

const searchNpm = async (query) => {
  if (!query || query.length < 2) return []
  const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=8`)
  if (!res.ok) return []
  const data = await res.json()
  return data.objects ?? []
}

export default function SearchBar({ onSearch, loading }) {
  const [value,       setValue]       = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open,        setOpen]        = useState(false)
  const [active,      setActive]      = useState(-1)
  const debounceRef = useRef(null)
  const wrapperRef  = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val)
    setActive(-1)

    clearTimeout(debounceRef.current)
    if (!val.trim()) { setSuggestions([]); setOpen(false); return }

    debounceRef.current = setTimeout(async () => {
      const results = await searchNpm(val.trim())
      setSuggestions(results)
      setOpen(results.length > 0)
    }, 250)
  }

  const handleSelect = (name) => {
    setValue(name)
    setSuggestions([])
    setOpen(false)
    onSearch(name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim().toLowerCase()
    if (!trimmed) return
    if (active >= 0 && suggestions[active]) {
      handleSelect(suggestions[active].package.name)
    } else {
      handleSelect(trimmed)
    }
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(p => Math.min(p + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(p => Math.max(p - 1, -1)) }
    if (e.key === 'Escape')    { setOpen(false); setActive(-1) }
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{
              position: 'absolute', left: '12px', top: '50%',
              transform: 'translateY(-50%)',
              color: '#555', fontSize: '13px', fontFamily: 'monospace',
              pointerEvents: 'none', userSelect: 'none',
            }}>$</span>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => suggestions.length > 0 && setOpen(true)}
              placeholder="search package name..."
              spellCheck={false}
              autoComplete="off"
              style={{
                width: '100%', height: '40px',
                paddingLeft: '28px', paddingRight: '12px',
                background: '#0a0a0a',
                border: `1px solid ${open ? '#0070f3' : '#222'}`,
                borderRadius: open ? '6px 6px 0 0' : '6px',
                color: '#ededed', fontSize: '13px',
                fontFamily: 'monospace', outline: 'none',
                transition: 'border-color 0.15s',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !value.trim()}
            style={{
              height: '40px', padding: '0 20px',
              background: loading || !value.trim() ? '#111' : '#0070f3',
              color: loading || !value.trim() ? '#444' : '#fff',
              border: 'none', borderRadius: '6px',
              fontSize: '13px', fontWeight: 500,
              cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s', whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Loading...' : 'Inspect'}
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '40px', left: 0,
          right: '88px',
          background: '#0a0a0a',
          border: '1px solid #0070f3',
          borderTop: '1px solid #1a1a1a',
          borderRadius: '0 0 6px 6px',
          zIndex: 50, overflow: 'hidden',
        }}>
          {suggestions.map((item, i) => {
            const pkg = item.package
            return (
              <div
                key={pkg.name}
                onMouseDown={() => handleSelect(pkg.name)}
                onMouseEnter={() => setActive(i)}
                style={{
                  padding: '10px 14px',
                  background: active === i ? '#111' : 'transparent',
                  cursor: 'pointer',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #111' : 'none',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '12px',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: '#ededed', fontSize: '13px', fontFamily: 'monospace', marginBottom: '2px' }}>
                    {pkg.name}
                  </p>
                  <p style={{
                    color: '#555', fontSize: '11px',
                    whiteSpace: 'nowrap', overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {pkg.description}
                  </p>
                </div>
                <span style={{ color: '#333', fontSize: '10px', fontFamily: 'monospace', flexShrink: 0 }}>
                  v{pkg.version}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}