import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "./Navbar";

const Home = ({ userType, userName, isApproved, onLogout }) => {
  const role = localStorage.getItem("role");

  return (
    <>
      <div className="container mt-5">
        <Navbar />

        <br />
        <div className="welcome-message">
          <h3>{userName}, Welcome to Quizzify!</h3>
          <p>
            Where every question is a door to discovery! Let's unlock knowledge,
            one quiz at a time!
          </p>
          {!isApproved && (
            <div className="approval-msg">
              <p>
                Your account is pending approval.{" "}
                <i className="fa-solid fa-clock"></i>
              </p>
            </div>
          )}
        </div>
        <br />
        {userType === "admin" && (
          <div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button className="btn btn-block">Create Question</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-block">Create Quiz</button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button className="btn btn-block">Attempt Quiz</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-block">Response & Review</button>
              </div>
            </div>
            <button className="btn btn-block">Users</button>
          </div>
        )}
        {userType === "creator" && (
          <div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button className="btn btn-block">Create Question</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-block">Create Quiz</button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button className="btn btn-block">Attempt Quiz</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-block">Response & Review</button>
              </div>
            </div>
          </div>
        )}
        {userType === "user" && (
          <div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button className="btn btn-block">Attempt Quiz</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-block">My Quiz</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
