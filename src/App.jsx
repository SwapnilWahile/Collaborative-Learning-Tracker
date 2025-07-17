import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import Plan from "./pages/Plan";
// import Profile from "./pages/Profile";
import { PlanProvider } from "./context/PlanContext";
import "bootstrap/dist/css/bootstrap.min.css";
import PlanPage from "./pages/PlanPage";

const App = () => {
  return (
    <PlanProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} />
            <Route path="/plan/:id" element={<Plan />} />
            <Route path="/profile" element={<Profile />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan/:id" element={<PlanPage />} />
          </Routes>
        </div>
      </Router>
    </PlanProvider>
  );
};

export default App;
