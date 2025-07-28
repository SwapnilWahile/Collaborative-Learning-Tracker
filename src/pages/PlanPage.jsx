import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addPlan } from '../store/plansSlice';
import { addTask, toggleTask } from "../store/plansSlice";

const PlanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the plan by id (or name)
  const plan = useSelector((state) => state.plans.find((p) => p.id === id));
  const userType = useSelector((state) => state.user.type);

  // Local state for new task input
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (!plan) {
      // if no plan found, redirect back to dashboard
      navigate("/");
    }
  }, [plan, navigate]);

  const handleAddTask = (e) => {
    e.preventDefault(); // prevent full page reload

    if (!taskName.trim()) return;

    dispatch(
      addTask({
        planId: id,
        task: { name: taskName.trim(), completed: false },
      })
    );

    setTaskName(""); // clear input after add
  };

  const handleToggleTask = (taskIndex) => {
    dispatch(toggleTask({ planId: id, taskIndex }));
  };

  if (!plan) return <div>Plan not found</div>;

  return (
    <div className="container py-4">
      <h2>{plan.name} - Tasks</h2>

      {userType === "instructor" && (
        <form onSubmit={handleAddTask} className="my-3">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Add new task"
            className="form-control mb-2"
          />
          <button
            type="submit"
            className="btn btn-success"
            disabled={!taskName.trim()}
          >
            Add Task
          </button>
        </form>
      )}

      <ul className="list-group">
        {plan.tasks.length === 0 && (
          <li className="list-group-item">No tasks yet.</li>
        )}
        {plan.tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.name}
            </span>
           {userType === "instructor" && <button
              onClick={() => handleToggleTask(index)}
              className={`btn btn-sm ${
                task.completed ? "btn-secondary" : "btn-outline-success"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>}
          </li>
        ))}
      </ul>

      <Link to="/dashboard" className="btn btn-link mt-3">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default PlanPage;
