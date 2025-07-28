import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Learning Tracker</Link>
        {user.type && <div>
          <Link className="nav-link d-inline" to="/dashboard">Dashboard</Link>
          {/* <Link className="nav-link d-inline" to="/profile">Profile</Link> */}
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
