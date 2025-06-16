import { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetManager = ({ weddingId }) => {
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paid, setPaid] = useState(false); // Changement ici : paid au lieu de isPaid
  const [editingBudgetId, setEditingBudgetId] = useState(null);

  useEffect(() => {
    if (weddingId) {
      fetchBudgets();
    }
  }, [weddingId]);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/budgets/wedding/${weddingId}`);
      setBudgets(res.data);
    } catch (err) {
      console.error('Erreur fetch budgets:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weddingId) {
      alert("Sélectionne un mariage avant d'ajouter un budget.");
      return;
    }

    const budgetData = {
      title,
      amount: Number(amount),
      paid,
      weddingId,
    };

    try {
      if (editingBudgetId) {
        await axios.put(`http://localhost:5000/api/budgets/${editingBudgetId}`, budgetData);
      } else {
        await axios.post('http://localhost:5000/api/budgets', budgetData);
      }
      setTitle('');
      setAmount('');
      setPaid(false);
      setEditingBudgetId(null);
      fetchBudgets();
    } catch (err) {
      console.error('Erreur enregistrement budget:', err);
    }
  };

  const handleEdit = (budget) => {
    setTitle(budget.title);
    setAmount(budget.amount);
    setPaid(budget.paid);
    setEditingBudgetId(budget._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`);
      fetchBudgets();
    } catch (err) {
      console.error('Erreur suppression budget:', err);
    }
  };

  if (!weddingId) {
    return <p>Veuillez sélectionner un mariage pour gérer les budgets.</p>;
  }

  return (
    <div>
      <h2>Gestion des Budgets</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label>
          Payé ?
          <input
            type="checkbox"
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />
        </label>
        <button type="submit">{editingBudgetId ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            {budget.title} - {budget.amount}€ - {budget.paid ? 'Payé' : 'Non payé'}
            <button onClick={() => handleEdit(budget)}>Modifier</button>
            <button onClick={() => handleDelete(budget._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetManager;


