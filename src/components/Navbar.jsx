import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = ({ loggedInUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
      <Link to="/home" className="navbar-brand">
        <strong>Quizzify</strong>
      </Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item mr-3">
            <Link to="/home" className="nav-link">
              Home <i class="fa-solid fa-house"></i>
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link to="/profile" className="nav-link">
              Profile <i class="fa-solid fa-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              Logout <i className="fa-solid fa-power-off fa-sm"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
