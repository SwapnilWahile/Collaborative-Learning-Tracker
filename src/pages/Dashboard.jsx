import AddPlan from "../components/AddPlan";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPlan } from "../store/plansSlice";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.type) {
      navigate("/");
    }

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new Tooltip(el));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPlan = (plan) => {
    dispatch(addPlan(plan));
  };

  const getProgress = (plan) => {
    const total = plan.tasks.length;
    const completed = plan.tasks.filter((t) => t.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="dashboard container py-4">
      <h2>
        {user.type === "instructor" ? "My Study Plans" : "Study Plans For You"}
      </h2>
      {user.type === "instructor" && <AddPlan onAdd={handleAddPlan} />}

      <div className="row mt-4">
        {plans.length === 0 && <p>No plans yet. Start by adding one!</p>}
        {plans.map((plan, index) => {
          const progress = getProgress(plan);
          return (
            <div key={index} className="col-md-3 mb-3">
              <Link to={`/plan/${plan.id}`}>
                <div
                  className="card p-3 shadow-sm"
                  title="Click to add or view tasks in this plan"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  style={{ height: "145px" }}
                >
                  <div className="row" title={plan.name}>
                    <h5 className="col-11 text-truncate">{plan.name}</h5>
                  </div>
                  <p>{plan.tasks.length} tasks</p>

                  {plan.tasks.length !== 0 && (
                    <div
                      className="progress mb-2"
                      title="Shows the percentage of tasks completed"
                      style={{ height: "20px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {progress}%
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
