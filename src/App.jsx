import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserSelect from "./pages/UserSelect";

const PlanPage = lazy(() => import("./pages/PlanPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StudentManagement = lazy(() => import("./pages/StudentManagement"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<UserSelect />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan/:id" element={<PlanPage />} />
            <Route path="/students" element={<StudentManagement />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
