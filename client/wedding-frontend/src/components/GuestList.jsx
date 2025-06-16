import { useState, useEffect } from 'react';
import axios from 'axios';

const GuestList = ({ weddingId }) => {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState('');
  const [isInvited, setIsInvited] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  useEffect(() => {
    if (weddingId) fetchGuests();
  }, [weddingId]);

  const fetchGuests = async () => {
    const res = await axios.get(`http://localhost:5000/api/guests/wedding/${weddingId}`);
    setGuests(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, status: isInvited, weddingId };

    if (editingGuest) {
      await axios.put(`http://localhost:5000/api/guests/${editingGuest._id}`, payload);
    } else {
      await axios.post('http://localhost:5000/api/guests', payload);
    }

    setName('');
    setIsInvited(false);
    setEditingGuest(null);
    fetchGuests();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/guests/${id}`);
    fetchGuests();
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setName(guest.name);
    setIsInvited(guest.status);
  };

  return (
    <div>
      <h2>Invités</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isInvited}
            onChange={(e) => setIsInvited(e.target.checked)}
          />
          Invité ?
        </label>
        <button type="submit">{editingGuest ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <ul>
        {guests.map((guest) => (
          <li key={guest._id}>
            {guest.name} - {guest.status ? 'Invité' : 'Non invité'}
            <button onClick={() => handleEdit(guest)}>Modifier</button>
            <button onClick={() => handleDelete(guest._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;







