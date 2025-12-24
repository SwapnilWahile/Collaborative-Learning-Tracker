import AddPlan from "../components/AddPlan";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPlan, deletePlan, editPlan } from "../store/plansSlice";
import { useEffect, useState } from "react";
import { Tooltip } from "bootstrap";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null);

  const dispatch = useDispatch();

  const students = JSON.parse(localStorage.getItem("students")) || [];

  useEffect(() => {

    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new Tooltip(el));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPlan = (plan) => {
    dispatch(addPlan(plan));
  };

  // const getProgress = (plan) => {
  //   const total = plan.tasks.length;
  //   const completed = plan.tasks.filter((t) => t.completed).length;

  //   return total === 0 ? 0 : Math.round((completed / total) * 100);
  // };

  const getProgress = (plan) => {
    const totalTasks = plan.tasks.length;
    const totalStudents = students.length; // list of all registered students

    if (totalTasks === 0 || totalStudents === 0) return 0;

    // Calculate progress of each task
    const taskProgressList = plan.tasks.map((task) => {
      const completedCount = Array.isArray(task.completed)
        ? task.completed.length
        : 0;

      return (completedCount / totalStudents) * 100;
    });

    // Average progress across all tasks
    const avgProgress =
      taskProgressList.reduce((sum, p) => sum + p, 0) / totalTasks;

    return Math.round(avgProgress);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      dispatch(deletePlan(id));
    }
  };

  const handleUpdatePlan = (id, name) => {
    dispatch(editPlan({ id, name }));
    setPlanToEdit(null);
  };

  const closeAddUpdatePlanModal = () => {
    setPlanToEdit(null);
    setShowAddPlanModal(!showAddPlanModal);
  };

  return (
    <div className="dashboard container py-4">
      <h2>
        {user.type === "instructor" ? "My Study Plans" : "Study Plans For You"}
      </h2>
      {user.type === "instructor" && (
        <>
          <div className="d-flex justify-content-end">
            <button
              onClick={() => setShowAddPlanModal(true)}
              className="btn btn-primary"
            >
              + Add New Plan
            </button>
          </div>
        </>
      )}
      {showAddPlanModal && (
        <AddPlan
          onAdd={handleAddPlan}
          onUpdate={handleUpdatePlan}
          planToEdit={planToEdit}
          closeModal={closeAddUpdatePlanModal}
        />
      )}

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
                  // data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  style={{ height: "145px" }}
                >
                  <div className="d-flex " title={plan.name}>
                    <h5 className="col-10 text-truncate">{plan.name}</h5>
                    {user.type === "instructor" && (
                      <>
                        <button
                          type="button"
                          title="Update Plan"
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowAddPlanModal(true);
                            setPlanToEdit(plan);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          type="button"
                          title="Delete Plan"
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(plan.id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
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
