import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import WeddingDetails from './components/WeddingDetails';
import GuestList from './components/GuestList';
import VendorList from './components/VendorList';
import BudgetManager from './components/BudgetManager';
import WeddingForm from './components/WeddingForm';
import TaskList from './pages/TaskList';

const Login = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/account/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      onLogin(token);
      setError('');
    } catch {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto', paddingTop: 50 }}>
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Pas encore de compte ? <button type="button" onClick={switchToRegister}>S’inscrire</button></p>
    </form>
  );
};

const Register = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/account/register', { email, password });
      setMessage('Inscription réussie, vous pouvez vous connecter.');
    } catch {
      setMessage('Erreur lors de l’inscription.');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 300, margin: 'auto', paddingTop: 50 }}>
      <h2>Inscription</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">S’inscrire</button>
      {message && <p>{message}</p>}
      <p>Déjà un compte ? <button type="button" onClick={switchToLogin}>Se connecter</button></p>
    </form>
  );
};

function App() {
  const [weddings, setWeddings] = useState([]);
  const [selectedWeddingId, setSelectedWeddingId] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchWeddings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/weddings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWeddings(res.data);
        if (res.data.length > 0) {
          setSelectedWeddingId(res.data[0]._id);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des mariages :', err);
      }
    };

    fetchWeddings();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setWeddings([]);
    setSelectedWeddingId('');
  };

  if (!token) {
    return showRegister
      ? <Register switchToLogin={() => setShowRegister(false)} />
      : <Login onLogin={setToken} switchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div>
      <Navbar token={token} onLogout={handleLogout} />

      <h1>Tableau de bord du mariage</h1>

      <div>
        <label>Choisir un mariage : </label>
        <select
          value={selectedWeddingId}
          onChange={(e) => setSelectedWeddingId(e.target.value)}
        >
          {weddings.map((wedding) => (
            <option key={wedding._id} value={wedding._id}>
              {wedding.brideName} & {wedding.groomName}
            </option>
          ))}
        </select>
      </div>

      <Routes>
        <Route path="/" element={<WeddingDetails weddingId={selectedWeddingId} />} />
        <Route path="/guests" element={<GuestList weddingId={selectedWeddingId} />} />
        <Route path="/vendors" element={<VendorList weddingId={selectedWeddingId} />} />
        <Route path="/budget" element={<BudgetManager weddingId={selectedWeddingId} />} />
        <Route path="/edit-wedding" element={<WeddingForm weddingId={selectedWeddingId} />} />
        <Route path="/tasks" element={<TaskList weddingId={selectedWeddingId} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

