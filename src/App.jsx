import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import Plan from "./pages/Plan";
// import Profile from "./pages/Profile";
import { PlanProvider } from "./context/PlanContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PlanPage from "./pages/PlanPage";

const App = () => {
  const [plans, setPlans] = useState(() => {
    return JSON.parse(localStorage.getItem("plans")).plans || [];
  });

  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);
  return (
    <PlanProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} />
            <Route path="/plan/:id" element={<Plan />} />
            <Route path="/profile" element={<Profile />} /> */}
            <Route
              path="/"
              element={<Dashboard plans={plans} setPlans={setPlans} />}
            />
            <Route
              path="/plan/:id"
              element={<PlanPage plans={plans} setPlans={setPlans} />}
            />
          </Routes>
        </div>
      </Router>
    </PlanProvider>
  );
};

export default App;
