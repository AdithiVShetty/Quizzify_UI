import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import "../styles/common.css";
import axios from "axios";

function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = () => {
    if (!Email) {
      setErrorMessage("Please enter your Email Id");
      return;
    }
    const requestData = { Email: Email };
    axios
      .post("http://localhost:5133/api/ForgotPassword/sendotp", requestData)
      .then((response) => {
        setOtpSent(true);
        setSuccessMessage(response.data);
        setShowOtpForm(true);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  const resendOTP = () => {
    setOtp(""); // Clear previous OTP
    sendOTP(); // Resend OTP
  };
  // console.log("SEND OTP");

  const verifyOTP = () => {
    if (!otp) {
      setErrorMessage("Please enter OTP");
      return;
    }
    console.log("SEND OTP");
    const requestData = { Email: Email, otp: otp };
    axios
      .post("http://localhost:5133/api/ForgotPassword/verifyotp", requestData) // Send requestData object
      .then((response) => {
        if (response.data.isVerified) {
          setSuccessMessage("OTP verified successfully!");
          setShowPasswordForm(true); // Show password form
        } else {
          setErrorMessage("Invalid OTP");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  const updatePassword = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please enter new password and confirm password");
      return;
    }
    axios
      .post("http://localhost:5133/api/ForgotPassword/updatepassword", {
        Email,
        newPassword,
      }) // Update password with backend API
      .then((response) => {
        setSuccessMessage(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="account-container well">
            <h3 className="text-center">
              <strong>Forgot Password</strong>
            </h3>
            <br />
            <div className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="Email">Email Id:</label>
                <input
                  type="Email"
                  id="Email"
                  name="email"
                  className="form-control"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Id"
                  required
                  autoFocus
                />
              </div>
              <button
                onClick={otpSent ? resendOTP : sendOTP}
                className="btn btn-block"
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
              {/* {!showOtpForm && (
                <button onClick={sendOTP} className="btn btn-block">
                  Send OTP
                </button>
              )} */}

              {showOtpForm && (
                <>
                  <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                      type="text"
                      id="otp"
                      name="email"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                      autoFocus
                    />
                  </div>
                  <button onClick={verifyOTP} className="btn btn-block">
                    Verify OTP
                  </button>
                </>
              )}

              {showPasswordForm && (
                <>
                  <br />
                  <div className="form-group">
                    <label htmlFor="new-password">New Password:</label>
                    <input
                      type="password"
                      id="new-password"
                      name="email"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter New Password"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="email"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      required
                      autoFocus
                    />
                  </div>
                  <button onClick={updatePassword} className="btn btn-block">
                    Update Password
                  </button>
                </>
              )}
            </div>

            {successMessage && !errorMessage && (
              <div class="alert alert-success success-message" role="alert">
                <i class="fa fa-check-circle success-icon"></i> {successMessage}
              </div>
            )}
            {errorMessage && !successMessage && (
              <div class="alert alert-danger error-message" role="alert">
                <i class="fa fa-exclamation-triangle error-icon"></i>{" "}
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
