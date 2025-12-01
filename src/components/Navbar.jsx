import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import { clearUserType } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear redux
    dispatch(clearUserType());

    // clear local storage
    localStorage.removeItem("userType");
    localStorage.removeItem("currentStudent");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Learning Tracker
        </Link>
        {user.type && (
          <div className="d-flex justify-content-end gap-3 col">
            <Link className="nav-link d-inline d-flex align-items-center" to="/dashboard">
              Dashboard
            </Link>
            {user.type === "instructor" && (
              <Link className="nav-link d-inline d-flex align-items-center" to="/students">
                Students
              </Link>
            )}

            <Notification />

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="profileMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle" style={{color: "#2c3e50", fontSize: "1.4rem"}}></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileMenuButton">
                <li>
                  <button className="dropdown-item" type="button">
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
