import { backendURL } from "../config.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Show Password Checkbox
  async function showPassword() {
    var pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  }
  // Button Submit
  async function Submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(backendURL + "/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            axios
              .get(backendURL + "/getNameAndID", {
                params: {
                  email: email,
                },
              })
              .then((res) => {
                var firstName = res.data.firstName;
                var id = res.data.id;
                // sending this data to our home page
                history("/home", {
                  state: { firstName: firstName, email: email, id: id },
                });
              });
          } else if (res.data === "notexist") {
            alert("User have not sign up");
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

  return (
    <div className="container">
      {/* Logo and App Description Text */}
      <div className="item" id="logo">
        <div className="textLogo">
          <div>
            <label> Welcome to</label>
          </div>
          <div>
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
                Sign in here to manage and protect your digital identity.
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="signInForm">
        <div className="">
          <div id="siText">
            <label> Sign In</label>
          </div>
          <div>
            <label>Monitor Data Breaches, Sign In Activity, and More!</label>
          </div>
          <div className="epLabels">
            <div className="leftAlignLabels">
              {/* Sign In Form */}
              <div className="login">
                <form action="POST">
                  <input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                  />
                  <input
                    className="smallMarginLeft"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                  />
                  {/* Checkbox shows password that was typed */}
                  <input
                    type="checkbox"
                    className="smallMarginLeft"
                    onChange={(e) => {
                      showPassword();
                    }}
                  />{" "}
                  Show Password
                  <Button
                    type="submit"
                    className="smallMarginTop smallMarginBottom"
                    id="whiteText"
                    onClick={Submit}
                    variant="dark"
                  >
                    Submit
                  </Button>
                </form>

                <p>OR</p>

                {/* Create Account Link */}
                <div className="blackLinkSmall">
                  <Link to="/signup" id="createAccountLink">
                    New? Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
