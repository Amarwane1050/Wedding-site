import { useState } from 'react';

function TaskForm({ weddingId, onTaskAdded }) {
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Le nom de la tâche est requis');
      return;
    }
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weddingId, name, done }),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'ajout de la tâche');

      const newTask = await res.json();
      onTaskAdded(newTask);
      setName('');
      setDone(false);
    } catch (err) {
      setError(err.message || 'Erreur serveur');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Nom de la tâche"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-check mb-2">
        <input
          type="checkbox"
          id="doneCheckbox"
          className="form-check-input"
          checked={done}
          onChange={() => setDone(!done)}
        />
        <label htmlFor="doneCheckbox" className="form-check-label">Terminé</label>
      </div>
      <button type="submit" className="btn btn-primary">Ajouter</button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}

export default TaskForm;
