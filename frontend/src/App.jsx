import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';

export default function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setPage('login');
  };

  if (token) return <Profile token={token} onLogout={logout} />;

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('register')}>Register</button>
      </div>

      {page === 'login'
        ? <Login onLogin={setToken} />
        : <Register onSuccess={() => setPage('login')} />
      }
    </div>
  );
}