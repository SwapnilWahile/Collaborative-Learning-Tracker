import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Learning Tracker</Link>
        <div>
          <Link className="nav-link d-inline" to="/">Dashboard</Link>
          {/* <Link className="nav-link d-inline" to="/profile">Profile</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
