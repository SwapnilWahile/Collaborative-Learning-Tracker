import React, { useState } from 'react';
import AddPlan from '../components/AddPlan';
// import AddPlan from './AddPlan';

const Dashboard = () => {
  const [plans, setPlans] = useState([]);

  const handleAddPlan = (newPlan) => {
    setPlans([...plans, newPlan]);
  };

  return (
    <div className="dashboard container py-4">
      <h2>My Study Plans</h2>
      <AddPlan onAdd={handleAddPlan} />

      <div className="row mt-4">
        {plans.length === 0 && <p>No plans yet. Start by adding one!</p>}
        {plans.map((plan, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{plan.name}</h5>
              <p>{plan.tasks.length} tasks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
