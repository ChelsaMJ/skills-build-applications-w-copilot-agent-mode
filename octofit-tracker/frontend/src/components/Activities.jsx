import { useEffect, useMemo, useState } from 'react'

const browserHostname =
  typeof window !== 'undefined' ? window.location.hostname : ''
const API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : browserHostname.endsWith('.app.github.dev')
    ? `https://${browserHostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')}/api/activities/`
  : 'http://localhost:8000/api/activities/'

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

function Activities() {
  const [activities, setActivities] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_ENDPOINT)

        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`)
        }

        const payload = await response.json()
        const rows = extractCollection(payload)

        if (!isMounted) {
          return
        }

        setActivities(rows)
        setTotal(getTotalCount(payload, rows.length))
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

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (loading) {
      return <p className="status-text">Loading activities...</p>
    }

    if (error) {
      return <p className="status-text text-danger">{error}</p>
    }

    if (activities.length === 0) {
      return <p className="status-text">No activities available.</p>
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>User</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.createdAt}`}>
                <td>{activity.type ?? 'n/a'}</td>
                <td>{activity.minutes ?? 'n/a'}</td>
                <td>{activity.calories ?? 'n/a'}</td>
                <td>{activity.userId ?? 'n/a'}</td>
                <td>{activity.teamId ?? 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [activities, error, loading])

  return (
    <section className="panel-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="panel-head mb-3">
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-secondary mb-0">Fetched from {API_ENDPOINT}</p>
          <small className="text-muted">Records shown: {activities.length} / {total}</small>
        </div>
        {content}
      </div>
    </section>
  )
}

export default Activities
