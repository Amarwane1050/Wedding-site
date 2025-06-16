import { useEffect, useState } from 'react';
import axios from 'axios';

const WeddingDetails = () => {
  const [weddings, setWeddings] = useState([]);
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [editingWedding, setEditingWedding] = useState(null);

  useEffect(() => {
    fetchWeddings();
  }, []);

  const fetchWeddings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/weddings');
      setWeddings(res.data);
    } catch (err) {
      console.error('Erreur fetch weddings:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const weddingData = { brideName, groomName, date, location };

    try {
      if (editingWedding) {
        await axios.put(`http://localhost:5000/api/weddings/${editingWedding._id}`, weddingData);
      } else {
        await axios.post('http://localhost:5000/api/weddings', weddingData);
      }

      // reset form
      setBrideName('');
      setGroomName('');
      setDate('');
      setLocation('');
      setEditingWedding(null);
      fetchWeddings(); // refresh list
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
    }
  };

  const handleEdit = (wedding) => {
    setEditingWedding(wedding);
    setBrideName(wedding.brideName);
    setGroomName(wedding.groomName);
    setDate(wedding.date?.slice(0, 10));
    setLocation(wedding.location);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/weddings/${id}`);
      fetchWeddings();
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  return (
    <div>
      <h2>Liste des Mariages</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la mariée"
          value={brideName}
          onChange={(e) => setBrideName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom du marié"
          value={groomName}
          onChange={(e) => setGroomName(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">{editingWedding ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <ul>
        {weddings.map((wedding) => (
          <li key={wedding._id}>
            <strong>{wedding.brideName} & {wedding.groomName}</strong> — {new Date(wedding.date).toLocaleDateString()} — {wedding.location}
            <button onClick={() => handleEdit(wedding)}>Modifier</button>
            <button onClick={() => handleDelete(wedding._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeddingDetails;


