import React from "react";
import "../styles/Logout.css";
import "../styles/common.css";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./Navbar";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  // const handleCancel = () => {
  //   navigate(-1); // Go back one step in history
  // };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="logout-container ">
              <i className="fas fa-user-circle logout-icon"></i>
              <h2 className="logout-title">Are you sure you want to logout?</h2>
              <button className="btn btn-logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
              <Link to="/home" className="btn btn-cancel">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
