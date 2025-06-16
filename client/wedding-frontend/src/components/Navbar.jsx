import { Link, useNavigate } from 'react-router-dom';

function Navbar({ token, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // redirige à la racine après déconnexion
  };

  return (
    <nav style={{ background: '#eee', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Accueil</Link>
      <Link to="/guests" style={{ marginRight: '10px' }}>Invités</Link>
      <Link to="/vendors" style={{ marginRight: '10px' }}>Prestataires</Link>
      <Link to="/budget" style={{ marginRight: '10px' }}>Budget</Link>
      <Link to="/tasks" style={{ marginRight: '10px' }}>Tâches</Link>

      {token ? (
        <button
          onClick={handleLogout}
          style={{ marginLeft: '20px', cursor: 'pointer' }}
        >
          Se déconnecter
        </button>
      ) : (
        <Link to="/login" style={{ marginLeft: '20px' }}>Se connecter</Link>
      )}
    </nav>
  );
}

export default Navbar;

