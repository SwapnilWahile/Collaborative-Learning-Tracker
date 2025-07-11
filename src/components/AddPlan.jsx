import React, { useState } from "react";

const AddPlan = ({ onAdd }) => {
  const [planName, setPlanName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!planName.trim()) return;
    onAdd({ name: planName, tasks: [] });
    setPlanName("");
    setShowModal(false);
  };

  return (
    <div className="add-plan">
      {!showModal && (
        <div className="d-flex justify-content-end">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            + Add New Plan
          </button>
        </div>
      )}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Plan</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Enter plan name"
                    className="form-control mb-3"
                  />
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlan;
