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

    // clear local storage
    localStorage.removeItem("userType");
    localStorage.removeItem("currentStudent");

    // clear redux
    dispatch(clearUserType());

    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Learning Tracker
        </Link>
        {user.type && (
          <div className="d-flex justify-content-end gap-3 col">
            <Link
              className="nav-link d-inline d-flex align-items-center"
              to="/dashboard"
            >
              Dashboard
            </Link>
            {user.type === "instructor" && (
              <Link
                className="nav-link d-inline d-flex align-items-center"
                to="/students"
              >
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
                <i
                  className="bi bi-person-circle"
                  style={{ color: "#2c3e50", fontSize: "1.4rem" }}
                ></i>
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileMenuButton"
              >
                <li>
                  <button className="dropdown-item" type="button">
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Info Button (Always Visible) */}
        <button
          type="button"
          className="btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center"
          style={{height: '28px', width: '28px', color: '#2c3e50'}}
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-placement="bottom"
          data-bs-html="true"
          
          title="How this app works"
          data-bs-content="
            <ol style='padding-left: 1rem; margin: 0; font-size: 14px;'>
              <li><b>Log in as Instructor</b> (credentials are pre-filled to reduce user effort).</li>
              <li><b>Add students</b> by clicking <b>Students</b> in the navigation bar.</li>
              <li><b>Create a study plan</b> using <b>+ Add New Plan</b> (acts like a course or subject).</li>
              <li><b>Click on a plan card</b> to create and manage tasks under that plan.</li>
              <li><b>Students log in</b> and view assigned study plans.</li>
              <li><b>Each student completes tasks independently</b> (progress is tracked per student).</li>
              <li><b>Instructor sees overall progress</b> based on all students’ task completion.</li>
              <li><b>Real-time notifications</b> are delivered using <b>WebSockets (Socket.IO)</b>.</li>
            </ol>
            "
        >
          <i className="bi bi-info-lg"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
