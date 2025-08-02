import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Learning Tracker
        </Link>
        {user.type && (
          <div className="d-flex justify-content-end gap-3 w-25">
            <Link className="nav-link d-inline" to="/dashboard">
              Dashboard
            </Link>
           <Notification count={3} />

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
