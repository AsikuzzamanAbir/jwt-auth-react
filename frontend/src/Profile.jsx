import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile({ token, onLogout }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data))
    .catch(() => onLogout()); // token invalid → logout
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Profile</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}