import React, { useState } from "react";
import "../styles/Login.css";
import "../styles/common.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5133/api/user/login",
        {
          EmailId: email,
          Password: password,
        }
      );
      const userData = response.data;
      onLogin(userData);
      navigate("/home"); // Redirect to home page after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="app-name-container">
            <div className="app-name">Quizzify</div>
          </div>
          <div className="account-container well">
            <h2 className="text-center">
              <strong>Login</strong>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <strong>Email Id</strong>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="text-right mb-2">
                <Link to="/forgot-password" className="link">
                  Forgot Password?
                </Link>
              </div>
              {error && (
                <div className="error-message">
                  <div
                    className="alert alert-danger error-message"
                    role="alert"
                  >
                    <i className="fa fa-exclamation-triangle error-icon"></i>{" "}
                    {error}
                  </div>
                </div>
              )}
              <button type="submit" className="btn btn-block">
                Login
              </button>
              <div className="text-left mt-3">
                <Link to="/register" className="link">
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
