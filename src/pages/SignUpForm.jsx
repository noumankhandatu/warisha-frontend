import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import baseUrl from "../components/baseUrl";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const navigate = useNavigate();
  const emailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const [getVals, setVals] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleEvents = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVals({ ...getVals, [name]: value });
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegix.test(getVals.email)) {
      alert("enter a valid email");
      return;
    }
    if (!passRegix.test(getVals.password)) {
      alert("password contain 8 letter including , uper and lower letter and special character");
      return;
    }
    const res = await baseUrl.post(`/signup`, getVals, {
      headers,
    });
    alert(res.data);
    navigate("/signin");
  };
  return (
    <div className="formCenter">
      <div style={{ height: "30px" }}></div>
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Full Name
          </label>
          <input
            onChange={(e) => {
              handleEvents(e);
            }}
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="fullName"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            onChange={(e) => {
              handleEvents(e);
            }}
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
            onChange={(e) => {
              handleEvents(e);
            }}
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className="formField">
          <label className="formFieldCheckboxLabel">
            <input className="formFieldCheckbox" type="checkbox" name="hasAgreed" />I agree all statements in
            <a href="null" className="formFieldTermsLink">
              terms of service
            </a>
          </label>
        </div>
        <div className="formField">
          <button onClick={handleSubmit} className="formFieldButton">
            Sign Up
          </button>
          <Link style={{ marginLeft: 10 }} to="/signin" className="formFieldLink">
            I'm already member
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
