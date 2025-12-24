import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserType } from "../store/userSlice";

const UserSelect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students || []);
  const [activeTab, setActiveTab] = useState("instructor");

  // Student login inputs
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPass, setStudentPass] = useState("");

  // Instructor login inputs (hard-coded default)
  const [instructorEmail, setInstructorEmail] = useState("admin@example.com");
  const [instructorPass, setInstructorPass] = useState("random@know$me");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleStudentLogin = (e) => {
    e.preventDefault();

    const existing = students.find(
      (s) => s.email.toLowerCase() === studentEmail.toLowerCase()
    );

    if (!existing) {
      alert("Student not found. Please check the email.");
      return;
    }

    // store logged student
    localStorage.setItem("currentStudent", JSON.stringify(existing));
    dispatch(setUserType("student"));

    navigate("/dashboard");
  };

  const handleInstructorLogin = (e) => {
    e.preventDefault();
    dispatch(setUserType("instructor"));
    // for now, no validation — just redirect
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center mt-5 align-items-center">
      <div className="card p-4 shadow" style={{ width: "auto" }}>
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "student" ? "active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              🎓 Student Login
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "instructor" ? "active" : ""
              }`}
              onClick={() => setActiveTab("instructor")}
            >
              👨‍🏫 Instructor Login
            </button>
          </li>
        </ul>

        {/* ---------------- STUDENT LOGIN TAB ---------------- */}
        {activeTab === "student" && (
          <form onSubmit={handleStudentLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={studentPass}
                onChange={(e) => setStudentPass(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-light btn-sm">
                Forgot Password?
              </button>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        )}

        {/* ---------------- INSTRUCTOR LOGIN TAB ---------------- */}
        {activeTab === "instructor" && (
          <form onSubmit={handleInstructorLogin}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={instructorEmail}
                onChange={(e) => setInstructorEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={instructorPass}
                onChange={(e) => setInstructorPass(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login as Instructor
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSelect;
