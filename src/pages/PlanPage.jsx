import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask } from "../store/plansSlice";
import socket from "../utils/socket";

const PlanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the plan by id (or name)
  const plan = useSelector((state) => state.plans.find((p) => p.id === id));
  const user = useSelector((state) => state.user);

  const students = JSON.parse(localStorage.getItem("students")) || [];

  const studentId =
    user.type === "student"
      ? JSON.parse(localStorage.getItem("currentStudent"))?.id
      : null;

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

    const newTask = { name: taskName.trim(), completed: [] };

    // Update Redux store
    dispatch(
      addTask({
        planId: id,
        task: newTask,
      })
    );

    // Emit socket event for notifications
    socket.emit("addTask", {
      task: {
        title: newTask.name, // matches server.js expected "title" field
        planId: id,
        planName: plan.name,
      },
      senderId: user.id,
      senderRole: user.type,
    });

    setTaskName(""); // clear input after add
  };

  const handleToggleTask = (task, taskIndex) => {
    dispatch(toggleTask({ planId: id, taskIndex, studentId: studentId }));
    socket.emit("updateTask", {
      task: { title: task.name, planId: id, planName: plan.name },
      senderId: user.id,
      senderRole: user.type,
    });
  };

  if (!plan) return <div>Plan not found</div>;

  return (
    <div className="container py-4">
      <h2>{plan.name} - Tasks</h2>

      {user.type === "instructor" && (
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
        {plan.tasks.map((task, index) => {
          const taskArr = task.completed ?? [];
          const isTaskCompletedByCurrentStudent =
            taskArr.indexOf(studentId) !== -1;
          return (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                isTaskCompletedByCurrentStudent ? "list-group-item-success" : ""
              }`}
            >
              <span
                style={{
                  textDecoration: isTaskCompletedByCurrentStudent
                    ? "line-through"
                    : "none",
                }}
              >
                {task.name}
              </span>

              {user.type === "instructor" && (
                <span>
                  <i>
                    {`${taskArr?.length} out of ${students?.length} marked as completed!`}
                  </i>
                </span>
              )}

              {user.type !== "instructor" && (
                <button
                  onClick={() => handleToggleTask(task, index)}
                  className={`btn btn-sm ${
                    isTaskCompletedByCurrentStudent
                      ? "btn-secondary"
                      : "btn-outline-success"
                  }`}
                >
                  {isTaskCompletedByCurrentStudent ? "Undo" : "Complete"}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <Link to="/dashboard" className="btn btn-link mt-3">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default PlanPage;
