import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';

function TaskList({ weddingId }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tasks/${weddingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des tâches');

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Erreur serveur');
    }
  };

  useEffect(() => {
    if (weddingId) fetchTasks();
  }, [weddingId]);

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div className="container mt-4">
      <h2>Liste des tâches</h2>
      <TaskForm weddingId={weddingId} onTaskAdded={handleTaskAdded} />
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.name}
            {task.done ? <span className="badge bg-success">Terminé</span> : <span className="badge bg-warning text-dark">En cours</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

