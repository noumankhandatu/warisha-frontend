import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { FacebookLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import baseUrl from "../components/baseUrl";

const SignInForm = () => {
  const navigate = useNavigate();
  const [getVal, setVal] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...getVal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseUrl.post("/signin", getVal);
      if (response) {
        alert(response.data.message);
        const jwtToken = response.data.token;
        if (jwtToken && jwtToken !== undefined && jwtToken !== null) {
          localStorage.setItem("jwtToken", jwtToken);
          navigate("/home");
          window.location.reload();
        }
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
      // Handle the error here or display an error message to the user
      alert("Please try again later internet issue");
    }
  };

  return (
    <div className="formCenter">
      <div style={{ height: "70px" }}></div>
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className="formField">
          <button onClick={handleSubmit} className="formFieldButton">
            Sign In
          </button>{" "}
          <Link style={{ marginLeft: 10 }} to="/signup" className="formFieldLink">
            Create an account
          </Link>
        </div>
      </form>
      <div style={{ height: "95px" }}></div>
    </div>
  );
};

export default SignInForm;
