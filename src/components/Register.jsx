import React, { Fragment, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import "../styles/common.css";

const RegistrationForm = ({
  organisations,
  formData,
  errors,
  handleInputChange,
  handleSave,
  isSaving,
}) => {
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="account-container well">
              <h3 className="text-center">
                <strong>Sign Up</strong>
              </h3>
              <h5 className="text-center mb-3">Create an account</h5>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Name" className="d-block">
                      <strong>Name</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="text"
                      id="Name"
                      placeholder="Enter Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                    />
                    {errors.Name && (
                      <span className="error-message">{errors.Name}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="EmailId" className="d-block">
                      <strong>Email Id</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="email"
                      id="EmailId"
                      placeholder="Enter Email Id"
                      value={formData.EmailId}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.EmailId && (
                      <span className="error-message">{errors.EmailId}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Password" className="d-block">
                      <strong>Password</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="password"
                      id="Password"
                      placeholder="Enter Password"
                      value={formData.Password}
                      onChange={handleInputChange}
                    />

                    {errors.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="d-block">
                      <strong>Confirm Password</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="password"
                      id="confirmPassword"
                      placeholder="Re-Enter Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="OrganisationName" className="d-block">
                      <strong>Organisation</strong>
                    </label>
                    {formData.OrganisationName === "Others" ? (
                      <input
                        type="text"
                        className="form-control input-field"
                        id="OtherOrganisationName"
                        value={formData.OtherOrganisationName}
                        onChange={handleInputChange}
                        placeholder="Enter Organisation Name"
                      />
                    ) : (
                      <select
                        className="form-control input-field"
                        id="OrganisationName"
                        value={formData.OrganisationName}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Organisation</option>
                        {organisations.map((org) => (
                          <option key={org.id} value={org.name}>
                            {org.name}
                          </option>
                        ))}
                        <option value="Others">Others</option>
                      </select>
                    )}
                    {errors.OrganisationName && (
                      <span className="error-message">
                        {errors.OrganisationName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="PhoneNumber" className="d-block">
                      <strong>Phone No</strong>
                    </label>
                    <input
                      className="form-control input-field"
                      type="text"
                      id="PhoneNumber"
                      placeholder="Enter Phone No"
                      value={formData.PhoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.PhoneNumber && (
                      <span className="error-message">
                        {errors.PhoneNumber}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Link to="/" className="link">
                  Have an account? Login
                </Link>
              </div>
              <br />
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="btn btn-block save-button"
                  disabled={isSaving} // Disable button when saving
                >
                  {isSaving ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisations: [],
      formData: {
        Name: "",
        EmailId: "",
        Password: "",
        confirmPassword: "",
        OrganisationName: "",
        OtherOrganisationName: "",
        PhoneNumber: "",
      },
      errors: {},
      isSaving: false, // Add isSaving state
      registrationSuccess: false, // Add registrationSuccess state
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5133/api/user/GetOrganisation")
      .then((response) => {
        this.setState({ organisations: response.data });
      })
      .catch((error) => {
        console.error("Error fetching organisations:", error);
      });
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    const errors = { ...this.state.errors };
    delete errors[id]; // Remove error for the current input field

    // Update form data based on input changes
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [id]: value,
      },
      errors: errors,
    }));
  };

  validateForm = () => {
    const {
      Name,
      EmailId,
      OrganisationName,
      Password,
      confirmPassword,
      OtherOrganisationName,
      PhoneNumber,
    } = this.state.formData;
    const errors = {};
    if (!Name || !/^[a-zA-Z\s]+$/.test(Name)) {
      errors.Name =
        "Name is required and should contain only letters and spaces";
    }

    if (!/\S+@\S+\.\S+/.test(EmailId)) {
      errors.EmailId = "Invalid email address";
    }
    if (!Password) {
      errors.password = "Password is required";
    } else if (Password.length < 8 || Password.length > 16) {
      errors.password = "Password must be between 8 to 16 characters in length";
    } else if (!/[A-Z]/.test(Password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(Password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[^A-Za-z0-9]/.test(Password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (Password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!OrganisationName) {
      errors.OrganisationName = "Organisation name is required";
    }
    if (OrganisationName === "Others" && !OtherOrganisationName) {
      errors.OrganisationName = "Organisation name is required";
    }
    if (!/^\d{10}$/.test(PhoneNumber)) {
      errors.PhoneNumber = "Phone Number should be exactly 10 digits";
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  handleSave = () => {
    if (this.validateForm()) {
      // Set isSaving state to true before saving
      this.setState({ isSaving: true });

      const data = { ...this.state.formData }; // Prepare data for saving

      axios
        .post("http://localhost:5133/api/user/RegisterForm", data)
        .then((response) => {
          if (response.data === "Data Inserted") {
            // Set registrationSuccess state to true
            this.setState({ registrationSuccess: true });
          } else {
            alert(response.data);
            this.setState({ isSaving: false });
          }
        })
        .catch((error) => {
          // Handle error
          this.setState({ isSaving: false });
          console.error("Error occurred while saving data:", error);
        });
    }
  };

  render() {
    const { organisations, formData, errors, registrationSuccess } = this.state;

    if (registrationSuccess) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="login-container well">
                <h3 className="text-center">
                  <strong>You are Successfully registered!</strong>
                </h3>
                <p className="text-center">You can now proceed to login.</p>
                <div className="text-center">
                  <Link to="/" className="btn btn-primary">
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <RegistrationForm
        organisations={organisations}
        formData={formData}
        errors={errors}
        handleInputChange={this.handleInputChange}
        handleSave={this.handleSave}
        isSaving={this.state.isSaving} // Pass isSaving state to the form
      />
    );
  }
}

export default Registration;
