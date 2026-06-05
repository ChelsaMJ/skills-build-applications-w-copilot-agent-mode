import { useEffect, useMemo, useState } from 'react'

const browserHostname =
  typeof window !== 'undefined' ? window.location.hostname : ''
const API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : browserHostname.endsWith('.app.github.dev')
    ? `https://${browserHostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')}/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function extractCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}

function getTotalCount(payload, currentLength) {
  if (typeof payload?.count === 'number') {
    return payload.count
  }

  if (typeof payload?.total === 'number') {
    return payload.total
  }

  return currentLength
}

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_ENDPOINT)

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`)
        }

        const payload = await response.json()
        const entries = extractCollection(payload)

        if (!isMounted) {
          return
        }

        setRows(entries)
        setTotal(getTotalCount(payload, entries.length))
      } catch (requestError) {
        if (!isMounted) {
          return
        }

        const message =
          requestError instanceof Error ? requestError.message : 'Unknown error'
        setError(message)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (loading) {
      return <p className="status-text">Loading leaderboard...</p>
    }

    if (error) {
      return <p className="status-text text-danger">{error}</p>
    }

    if (rows.length === 0) {
      return <p className="status-text">No leaderboard data available.</p>
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Member</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, index) => (
              <tr key={entry._id ?? `${entry.userId}-${index}`}>
                <td>{entry.rank ?? index + 1}</td>
                <td>{entry.userId ?? entry.member ?? 'n/a'}</td>
                <td>{entry.teamId ?? entry.team ?? 'n/a'}</td>
                <td>{entry.score ?? entry.points ?? 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [error, loading, rows])

  return (
    <section className="panel-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="panel-head mb-3">
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-secondary mb-0">Fetched from {API_ENDPOINT}</p>
          <small className="text-muted">Records shown: {rows.length} / {total}</small>
        </div>
        {content}
      </div>
    </section>
  )
}

export default Leaderboard
