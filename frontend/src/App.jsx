import { useState } from 'react'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import './auth.css'

export default function App() {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setPage('login')
  }

  if (token) return <Profile token={token} onLogout={logout} />

  return (
    <div className="app-root">
      <div className="bg-blobs">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>
      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <h1 className="brand-name">VaultX</h1>
          <p className="brand-sub">Secure authentication system</p>
        </div>
        <div className="tab-row">
          <button
            className={`tab-btn ${page === 'login' ? 'active' : ''}`}
            onClick={() => setPage('login')}
          >Login</button>
          <button
            className={`tab-btn ${page === 'register' ? 'active' : ''}`}
            onClick={() => setPage('register')}
          >Register</button>
        </div>
        {page === 'login'
          ? <Login onLogin={setToken} />
          : <Register onSuccess={() => setPage('login')} />}
      </div>
    </div>
  )
}
