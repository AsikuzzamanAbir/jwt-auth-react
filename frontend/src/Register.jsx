import { useState } from 'react';
import axios from 'axios';

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/register', form);
      setMsg(res.data.message);
      setTimeout(() => onSuccess(), 1000);
    } catch (err) {
      console.log('Full error:', err);
      if (err.response) {
        // Server responded with error
        setMsg('Server error: ' + err.response.data.message);
      } else if (err.request) {
        // No response from server
        setMsg('Cannot reach server — is backend running on port 5000?');
      } else {
        setMsg('Error: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      /><br /><br />
      <button onClick={handleSubmit}>Register</button>
      {msg && <p style={{ color: msg.includes('success') ? 'green' : 'red' }}>{msg}</p>}
    </div>
  );
}