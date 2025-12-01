import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, deleteStudent } from "../store/studentsSlice";
import { Link } from "react-router-dom";

const StudentManagement = () => {
  const students = useSelector((state) => state.students || []);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddStudent = (e) => {
    e.preventDefault();
    // console.log("gfjgjgd---------", e.target.studentName.value)
    // let name = e.target.studentName.value;
    // let email = e.target.studentEmail.value;
    // let password = e.target.studentEmail.value;
    if (!name.trim() || !email.trim() || !password.trim()) return;
    dispatch(addStudent({ id: Date.now().toString(), name, email, password }));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container py-4">
      <h2>👩‍🎓 Manage Students</h2>

      <form className="d-flex gap-2 mb-3" onSubmit={handleAddStudent}>
        <input
          type="text"
          name="studentName"
          className="form-control"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="studentEmail"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="studentPassword"
          className="form-control"
          placeholder="Enter login password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul className="list-group">
          {students.map((student) => (
            <li
              key={student.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{student.name}</strong> <br />
                <small>{student.email}</small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteStudent(student.id))}
              >
                <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/dashboard" className="btn btn-link mt-3">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default StudentManagement;
