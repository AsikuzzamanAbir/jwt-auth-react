import { useState, useEffect } from 'react'
import axios from 'axios'
import './auth.css'

export default function Profile({ token, onLogout }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setData(res.data))
      .catch(() => { setError('Session expired'); setTimeout(onLogout, 1500) })
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
          {data ? data.user.username[0].toUpperCase() : '?'}
        </div>
        {data ? (
          <>
            <h2 className="profile-name">Welcome back,</h2>
            <h1 className="profile-username">{data.user.username}</h1>
            <div className="profile-badge">Authenticated via JWT</div>
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">User ID</span>
                <span className="info-val">{data.user.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status</span>
                <span className="info-val status-active">Active</span>
              </div>
            </div>
          </>
        ) : error ? (
          <p className="msg error">{error}</p>
        ) : (
          <p className="loading-text">Loading profile...</p>
        )}
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
