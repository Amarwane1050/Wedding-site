import { useEffect, useState } from 'react';
import axios from 'axios';

const WeddingSelector = ({ onSelect }) => {
  const [weddings, setWeddings] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/weddings');
        setWeddings(res.data);
        if (res.data.length > 0) {
          setSelectedId(res.data[0]._id);
          onSelect(res.data[0]._id); // sélectionner automatiquement le premier
        }
      } catch (error) {
        console.error('Erreur lors du chargement des mariages :', error);
      }
    };
    fetchWeddings();
  }, [onSelect]);

  const handleChange = (e) => {
    setSelectedId(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div>
      <label htmlFor="wedding-select">Choisir un mariage : </label>
      <select id="wedding-select" value={selectedId} onChange={handleChange}>
        {weddings.map((wedding) => (
          <option key={wedding._id} value={wedding._id}>
            {wedding.name || 'Mariage sans nom'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeddingSelector;

