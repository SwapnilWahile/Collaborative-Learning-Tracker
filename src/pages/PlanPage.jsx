import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PlanPage = ({ plans, setPlans }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the plan by id (or name)
  const plan = plans.find(p => p.id === id);

  // Local state for new task input
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    if (!plan) {
      // if no plan found, redirect back to dashboard
      navigate('/');
    }
  }, [plan, navigate]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    // Update plans array immutably
    const updatedPlans = plans.map(p => {
      if (p.id === id) {
        return {
          ...p,
          tasks: [...p.tasks, { name: taskName, completed: false }]
        };
      }
      return p;
    });

    setPlans(updatedPlans);
    setTaskName('');
  };

  const toggleTaskComplete = (taskIndex) => {
    const updatedPlans = plans.map(p => {
      if (p.id === id) {
        const updatedTasks = p.tasks.map((t, i) =>
          i === taskIndex ? { ...t, completed: !t.completed } : t
        );
        return { ...p, tasks: updatedTasks };
      }
      return p;
    });

    setPlans(updatedPlans);
  };

  if (!plan) return null; // avoid flicker

  return (
    <div className="container py-4">
      <h2>{plan.name} - Tasks</h2>

      <form onSubmit={handleAddTask} className="my-3">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add new task"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">Add Task</button>
      </form>

      <ul className="list-group">
        {plan.tasks.length === 0 && <li className="list-group-item">No tasks yet.</li>}
        {plan.tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            <button
              onClick={() => toggleTaskComplete(index)}
              className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-outline-success'}`}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>

      <Link to="/" className="btn btn-link mt-3">← Back to Dashboard</Link>
    </div>
  );
};

export default PlanPage;
