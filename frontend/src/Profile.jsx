import { useState, useEffect } from 'react'
import './auth.css'

export default function Profile({ token, onLogout }) {
  const [username, setUsername] = useState('')

  useEffect(() => {
    try {
      // Decode JWT token to get username
      const payload = JSON.parse(atob(token.split('.')[1]))
      console.log('Token payload:', payload)
      setUsername(payload.sub || payload.userName || payload.username || 'User')
    } catch {
      setUsername('User')
    }
  }, [])

  return (
    <div className="app-root">
      <div className="bg-blobs">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>
      <div className="auth-card profile-card">
        <div className="avatar">
          {username[0]?.toUpperCase() || 'U'}
        </div>
        <h2 className="profile-name">Welcome back,</h2>
        <h1 className="profile-username">{username}</h1>
        <div className="profile-badge">Authenticated via JWT</div>
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="info-val status-active">Active</span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
