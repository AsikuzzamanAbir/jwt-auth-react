import { useState } from 'react'
import axios from 'axios'

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setMsg('Please fill in all fields')
      return
    }
    setLoading(true)
    setMsg('')
    try {
      const res = await axios.post('http://localhost:5000/register', form)
      setSuccess(true)
      setMsg(res.data.message)
      setTimeout(() => onSuccess(), 1500)
    } catch (err) {
      if (err.response) setMsg(err.response.data.message)
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
          placeholder="Choose a username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Choose a password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
      </div>
      {msg && <div className={`msg ${success ? 'success' : 'error'}`}>{msg}</div>}
      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner" /> : 'Create Account →'}
      </button>
    </div>
  )
}
