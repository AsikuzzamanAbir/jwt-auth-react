import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ userName: '', password: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.userName || !form.password) {
      setMsg('Please fill in all fields')
      return
    }
    setLoading(true)
    setMsg('')
    try {
      const res = await axios.post('http://localhost:8001/user/login', form)
      console.log('Login response:', res.data)
      const token = res.data.token || res.data.jwt || res.data.accessToken || res.data
      localStorage.setItem('token', token)
      onLogin(token)
    } catch (err) {
      if (err.response) setMsg(err.response.data)
      else setMsg('Cannot reach server — is backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-body">
      <div className="input-group">
        <label>Username</label>
        <input
          placeholder="Enter your username"
          value={form.userName}
          onChange={e => setForm({ ...form, userName: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      {msg && <div className="msg error">{msg}</div>}
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner" /> : 'Login →'}
      </button>
    </div>
  )
}
