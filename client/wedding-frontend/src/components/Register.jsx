import { useState } from 'react';
import axios from 'axios';

function Register({ switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/account/register', {
        email,
        password
      });
      setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (err) {
      setMessage('Erreur lors de l’inscription. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 300, margin: 'auto', paddingTop: 50 }}>
      <h2>Inscription</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">S’inscrire</button>
      {message && <p>{message}</p>}
      <p>Déjà un compte ? <button type="button" onClick={switchToLogin}>Se connecter</button></p>
    </form>
  );
}

export default Register;
