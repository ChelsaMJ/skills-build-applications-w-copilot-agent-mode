import { useEffect, useMemo, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

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

function Users() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE}/users/`)

        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`)
        }

        const payload = await response.json()
        const rows = extractCollection(payload)

        if (!isMounted) {
          return
        }

        setUsers(rows)
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

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (loading) {
      return <p className="status-text">Loading users...</p>
    }

    if (error) {
      return <p className="status-text text-danger">{error}</p>
    }

    if (users.length === 0) {
      return <p className="status-text">No users available.</p>
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id ?? `${user.email}-${index}`}>
                <td>{user.name ?? 'n/a'}</td>
                <td>{user.email ?? 'n/a'}</td>
                <td>{user.role ?? 'n/a'}</td>
                <td>{user.teamId ?? 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [error, loading, users])

  return (
    <section className="panel-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="panel-head mb-3">
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-secondary mb-0">Fetched from {API_BASE}/users/</p>
          <small className="text-muted">Records shown: {users.length} / {total}</small>
        </div>
        {content}
      </div>
    </section>
  )
}

export default Users
