import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserSelect from "./pages/UserSelect";
import { Popover } from "bootstrap";
import ProtectedRoute from "./components/ProtectedRoute";

const PlanPage = lazy(() => import("./pages/PlanPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const StudentManagement = lazy(() => import("./pages/StudentManagement"));

const App = () => {

  useEffect(() => {
    // mark that a session is active
    sessionStorage.setItem("isReload", "true");

    const handleBeforeUnload = () => {
      const isReload = sessionStorage.getItem("isReload");

      if (isReload) {
        // It is a refresh - keep user logged in
        sessionStorage.removeItem("isReload");
      } else {
        // It is a tab close - clear auth
        localStorage.removeItem("userType");
        localStorage.removeItem("currentStudent");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );

    popoverTriggerList.forEach((popover) => new Popover(popover));

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route
              path="/"
              element={<UserSelect />}
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plan/:id"
              element={
                <ProtectedRoute>
                  <PlanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <StudentManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
