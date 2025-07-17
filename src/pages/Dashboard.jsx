import AddPlan from "../components/AddPlan";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addPlan } from '../store/plansSlice';

const Dashboard = () => {

  const plans = useSelector(state => state.plans);
  const dispatch = useDispatch();

  const handleAddPlan = (plan) => {
    dispatch(addPlan(plan));
  };
  return (
    <div className="dashboard container py-4">
      <h2>My Study Plans</h2>
      <AddPlan onAdd={handleAddPlan} />

      <div className="row mt-4">
        {plans.length === 0 && <p>No plans yet. Start by adding one!</p>}
        {plans.map((plan, index) => (
          <div key={index} className="col-md-4 mb-3">
            <Link to={`/plan/${plan.id}`}>
              <div className="card p-3 shadow-sm">
                <h5>{plan.name}</h5>
                <p>{plan.tasks.length} tasks</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
