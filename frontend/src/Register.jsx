import { useState } from 'react'
import axios from 'axios'

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({
    userName: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    emergencyContactNo: '',
    permanentAddress: ''
  })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!form.userName || !form.password || !form.firstName || !form.email) {
      setMsg('Please fill in all required fields')
      return
    }
    setLoading(true)
    setMsg('')
    try {
      const res = await axios.post('http://localhost:8001/user/signup', form)
      setSuccess(true)
      setMsg('Account created successfully!')
      setTimeout(() => onSuccess(), 1500)
    } catch (err) {
      setSuccess(false)
      if (err.response) setMsg(err.response.data)
      else setMsg('Cannot reach server — is backend running?')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    fontFamily: 'DM Sans, sans-serif'
  }

  return (
    <div className="form-body">

      {/* Name Row */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>First Name</label>
          <input
            style={inputStyle}
            placeholder="First name"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Last Name</label>
          <input
            style={inputStyle}
            placeholder="Last name"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
      </div>

      {/* Username */}
      <div className="input-group">
        <label>Username (3-7 characters)</label>
        <input
          placeholder="Choose a username"
          value={form.userName}
          onChange={e => setForm({ ...form, userName: e.target.value })}
        />
      </div>

      {/* Email */}
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Password */}
      <div className="input-group">
        <label>Password (4-14 characters)</label>
        <input
          type="password"
          placeholder="Choose a password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* Contact Row */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Contact No</label>
          <input
            style={inputStyle}
            placeholder="Your number"
            value={form.contactNo}
            onChange={e => setForm({ ...form, contactNo: e.target.value })}
          />
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Emergency Contact</label>
          <input
            style={inputStyle}
            placeholder="Emergency number"
            value={form.emergencyContactNo}
            onChange={e => setForm({ ...form, emergencyContactNo: e.target.value })}
          />
        </div>
      </div>

      {/* Permanent Address */}
      <div className="input-group">
        <label>Permanent Address</label>
        <textarea
          placeholder="Enter your permanent address"
          value={form.permanentAddress}
          onChange={e => setForm({ ...form, permanentAddress: e.target.value })}
          rows={2}
          style={{
            ...inputStyle,
            resize: 'none',
            lineHeight: '1.5'
          }}
        />
      </div>

      {/* Role */}
      <div className="input-group">
        <label>Role</label>
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          style={{
            ...inputStyle,
            cursor: 'pointer'
          }}
        >
          <option value="user" style={{ background: '#1a1a2e' }}>user</option>
          <option value="admin" style={{ background: '#1a1a2e' }}>admin</option>
        </select>
      </div>

      {msg && <div className={`msg ${success ? 'success' : 'error'}`}>{msg}</div>}

      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner" /> : 'Create Account →'}
      </button>

    </div>
  )
}
