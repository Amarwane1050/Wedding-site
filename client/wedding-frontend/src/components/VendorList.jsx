import { useState, useEffect } from 'react';
import axios from 'axios';

const VendorList = ({ weddingId }) => {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [editingVendorId, setEditingVendorId] = useState(null);

  useEffect(() => {
    if (weddingId) fetchVendors();
  }, [weddingId]);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/vendors/wedding/${weddingId}`);
      setVendors(res.data);
    } catch (err) {
      console.error('Erreur fetch prestataires:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weddingId) {
      alert("Sélectionne un mariage avant d'ajouter un prestataire.");
      return;
    }

    const vendorData = { weddingId, name, service, contact, price: Number(price) };

    try {
      if (editingVendorId) {
        await axios.put(`http://localhost:5000/api/vendors/${editingVendorId}`, vendorData);
      } else {
        await axios.post('http://localhost:5000/api/vendors', vendorData);
      }
      setName('');
      setService('');
      setContact('');
      setPrice('');
      setEditingVendorId(null);
      fetchVendors();
    } catch (err) {
      console.error('Erreur enregistrement prestataire:', err);
    }
  };

  const handleEdit = (vendor) => {
    setName(vendor.name);
    setService(vendor.service);
    setContact(vendor.contact || '');
    setPrice(vendor.price || '');
    setEditingVendorId(vendor._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vendors/${id}`);
      fetchVendors();
    } catch (err) {
      console.error('Erreur suppression prestataire:', err);
    }
  };

  if (!weddingId) {
    return <p>Veuillez sélectionner un mariage pour gérer les prestataires.</p>;
  }

  return (
    <div>
      <h2>Gestion des Prestataires</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{editingVendorId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {vendors.map((vendor) => (
          <li key={vendor._id}>
            {vendor.name} - {vendor.service} - {vendor.contact} - {vendor.price}€
            <button onClick={() => handleEdit(vendor)}>Modifier</button>
            <button onClick={() => handleDelete(vendor._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorList;

