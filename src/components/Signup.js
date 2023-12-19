import { backendURL } from "../config.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import "../Styles/home.css";
import Button from "react-bootstrap/Button";

function Login() {
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setPasswordAgain] = useState("");

  // Show Password checkbox to reveal hidden password
  async function showPassword() {
    var pass1 = document.getElementById("password");
    var pass2 = document.getElementById("passwordRetype");
    if (pass1.type === "password") {
      pass1.type = "text";
      pass2.type = "text";
    } else {
      pass1.type = "password";
      pass2.type = "password";
    }
  }

  // Submit Button to Check if User Exists, otherwise submit data and sign in
  async function Submit(e) {
    e.preventDefault();
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("passwordRetype").value;

    if (pass1 != pass2) {
      alert("Passwords Do Not Match!");
    } else {
      try {
        await axios
          .post(backendURL + "/register", {
            firstName,
            lastName,
            email,
            password,
          })
          .then((res) => {
            if (res.data === "exist") {
              alert("User already exists");
            } else if (res.data === "notexist") {
              // Sending data over to home
              history("/home", {
                state: { firstName: firstName, email: email },
              });
            }
          })
          .catch((e) => {
            alert("wrong details");
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div>
      <div className="login">
        {/* Logo and App Description */}
        <div className="container">
          <div className="item" id="logo">
            <div className="textLogo">
              <div>
                <label> Welcome to</label>
              </div>
              <div>
                {/* <label> Quiet Feet</label> */}
                <Link to="/" id="qfLogo">
                  Quiet Feet
                </Link>
              </div>

              <div className="smallText">
                <div>
                  <label>Your all-in-one digital footprint manager.</label>
                </div>
                <div>
                  <label>
                    Create an Account here to manage and protect your digital
                    identity.
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="largeMarginTop largeMarginLeft">
            <h1>Create an Account</h1>
            <p>Monitor Data Breaches, Sign In Activity, and More!</p>

            {/* Create Account Form */}
            <form action="POST" className="createColumn">
              <input
                type="name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
              />
              <input
                type="name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
              />
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <input
                type="password"
                id="passwordRetype"
                onChange={(e) => {
                  setPasswordAgain(e.target.value);
                }}
                placeholder="Re-Type Password"
              />
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    showPassword();
                  }}
                />{" "}
                Show Password
              </div>
              <Button
                type="submit"
                className="smallMarginTop"
                onClick={Submit}
                variant="dark"
              >
                Submit
              </Button>
            </form>

            <br />
            <p>OR</p>

            {/* Login Link */}
            <div className="blackLinkSmall">
              <Link to="/login" className="blackLink">
                Login Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
