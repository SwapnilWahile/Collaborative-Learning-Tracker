import React from "react";
import { Link } from "react-router-dom";
import { usePlans } from "../context/PlanContext";
import "./Dashboard.scss";

const Dashboard = () => {
  const { state } = usePlans();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {state.plans.length === 0 ? (
        <p>No study plans yet. Start by adding one!</p>
      ) : (
        <div className="list-group">
          {state.plans.map(plan => (
            <Link
              to={`/plan/${plan.id}`}
              className="list-group-item list-group-item-action"
              key={plan.id}
            >
              {plan.title}
              <span>{plan.tasks.filter(t => t.completed).length}/{plan.tasks.length} done</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
