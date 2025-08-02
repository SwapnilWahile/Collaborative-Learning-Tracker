import { useNavigate } from "react-router-dom";
import "./UserSelect.scss";
import { useDispatch } from "react-redux";
import { setUserType, clearUserType } from "../store/userSlice";
import React, { useEffect } from "react";

export default function UserSelect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUserType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectUser = (type) => {
    // localStorage.setItem('userType', type); // or use Redux
    dispatch(setUserType(type));
    navigate("/dashboard");
  };

  return (
    <div className="container text-center py-5">
      <h2>Select Account Type</h2>
      <div className="row mt-4 gap-2 justify-content-center">
        <div className="col-md-4">
          <div className="card p-4" onClick={() => selectUser("instructor")}>
            <h4>👨‍🏫 Instructor</h4>
            <p>Can create and manage plans/tasks</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4" onClick={() => selectUser("student")}>
            <h4>🎓 Student</h4>
            <p>View-only access + real-time notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
}
