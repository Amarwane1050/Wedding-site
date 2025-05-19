import { useEffect, useState } from 'react';
import axios from 'axios';

function GuestList() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/guests`)
      .then(res => setGuests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Liste des invités</h2>
      <ul>
        {guests.map(guest => (
          <li key={guest._id}>{guest.name} - {guest.rsvp}</li>
        ))}
      </ul>
    </div>
  );
}

export default GuestList;
