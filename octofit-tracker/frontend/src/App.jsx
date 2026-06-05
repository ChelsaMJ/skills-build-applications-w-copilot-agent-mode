import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logoImg from '../../../docs/octofitapp-small.png'
import './App.css'

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function AppShell() {
  return (
    <>
      <header className="app-header">
        <div className="brand-wrap">
          <img src={logoImg} className="brand-logo" alt="OctoFit" />
          <div>
            <h1>OctoFit Tracker</h1>
            <p>Multi-tier dashboard for activity and team performance</p>
          </div>
        </div>
        <nav className="nav-grid" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `btn btn-sm nav-chip ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <div className="app-shell container py-4 py-lg-5">
      <AppShell />
    </div>
  )
}

export default App
