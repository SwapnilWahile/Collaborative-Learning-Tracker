import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import Plan from "./pages/Plan";
// import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import PlanPage from "./pages/PlanPage";
import UserSelect from "./pages/UserSelect";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} />
            <Route path="/plan/:id" element={<Plan />} />
            <Route path="/profile" element={<Profile />} /> */}
          <Route path="/" element={<UserSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan/:id" element={<PlanPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
