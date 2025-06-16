// src/components/WeddingForm.jsx
import { useState } from 'react';
import axios from 'axios';

function WeddingForm() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/weddings', formData);
      alert('Mariage ajouté avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un mariage</h2>
      <input type="text" name="name" placeholder="Nom" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <input type="text" name="location" placeholder="Lieu" onChange={handleChange} />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default WeddingForm;
