import React, { useState } from "react";
import socket from "../utils/socket";

const AddPlan = ({ onAdd, planToEdit, onUpdate, closeModal }) => {
  const [planName, setPlanName] = useState(planToEdit?planToEdit.name:'');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!planName.trim()) return;
    const newPlan = { id: Date.now().toString(), name: planName, tasks: [] };

    // Update local UI
    if (planToEdit) {
      onUpdate(planToEdit.id, planName);
    } else {
      onAdd(newPlan);
      socket.emit("addPlan", newPlan);
    }

    // Emit to backend so it can notify students
    setPlanName("");
    closeModal();
    // setShowModal(false);
  };

  return (
    <div className="add-plan">
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${planToEdit ? 'Update' : 'Add New'} Plan`}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setPlanName("");
                  closeModal()}}
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
                    {planToEdit ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlanName("");
                      closeModal()}}
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
    </div>
  );
};

export default AddPlan;
