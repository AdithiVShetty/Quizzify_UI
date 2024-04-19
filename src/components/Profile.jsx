import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import NavBar from "./Navbar";

function Profile({ user }) {
  const [userProfile, setUserProfile] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5133/api/user/userprofile?userId=${user.userId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  if (!userProfile) {
    return (
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p class="loading-text"> Loading...</p>
      </div>
    );
  }

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="profile-card">
              <div className="profile-title text-center mb-4">
                My Profile <i class="fa-solid fa-user"></i>
              </div>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={userProfile.name}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={userProfile.emailId}
                      placeholder="Enter your email"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={userProfile.phoneNumber}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      value={userProfile.roleName}
                      placeholder="Enter your role"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="organization">Organisation Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="organization"
                    value={userProfile.organisationName}
                    placeholder="Enter your organization name"
                    readOnly
                  />
                </div>
              </form>
              <button
                onClick={handleToggleChangePassword}
                className="btn btn-primary"
              >
                Change Password
              </button>

              {showChangePassword && (
                <form>
                  <br />
                  <div className="form-group">
                    <label htmlFor="existing-password">Existing Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="existing-password"
                      placeholder="Enter your existing password"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="new-password"
                          placeholder="Enter your new password"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="confirm-password">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm-password"
                          placeholder="Confirm your new password"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Confirm Change
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
