import { useLocation, useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { backendURL } from "../config.js";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../Styles/home.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import Accounts from './Accounts.js';


function Home() {
  const location = useLocation();
  var inputRef = useRef(null);

  const [email, setLoggedEmail] = useState("");
  const [description, setLoggedDescription] = useState("");
  const [data, setData] = useState([]);

  var fetchData = async () => {
    await axios
      .get(backendURL + "/getEmails", {
        params: {
          email: location.state.email,
        },
      })
      .then((res) => {
        var dataLength = res.data.email.length;
        var emails = res.data.email;
        var descriptions = res.data.description;
        var data = [];
        var email;
        var description;
        for (var i = 0; i <= dataLength; i++) {
          if (dataLength == 0) {
            email = res.data.email;
            description = res.data.description;

            data.push({
              [i]: {
                0: email,
                1: description,
              },
            });
          } else {
            if (i == dataLength) {
              break;
            } else {
              email = emails[i];
              description = descriptions[i];

              data.push({
                [i]: {
                  0: email,
                  1: description,
                },
              });
            }
          }
        }
        setData(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function sendUserInfo(e) {
    e.preventDefault();

    
    // history("/accounts", { state: { firstName: firstName, email: email } });
    
    window.location = '/accounts';
  }

  async function Submit(e) {
    var userEmail = location.state.email;

    e.preventDefault();
    try {
      await axios
        .post(backendURL + "/addEmail", {
          userEmail,
          email,
          description,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("Email already in store");
          } else if (res.data === "notexist" || res.data === "updated") {
            alert("Data Added");
            var email = document.getElementById("email");
            var description = document.getElementById("description");
            email.value = "";
            description.value = "";

            // Axios Get an array of all listed emails and then display them

            axios.get(backendURL + "/getEmails");
            window.location.reload();
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
    <>
      <div className="homepage">
        <div className="container2 ">
          <div className="whiteLink smallMarginBottom ">
            <div className="home-logo" id="QFD">
              {/* Show Logo, Name, and Sign Out at Top Header */}
              <div className="createRow">
                <div>
                  <Link to="/">Quiet Feet</Link>
                </div>
                <div className="alignRight hugeMarginLeft">
                  {" "}
                  <h4>Hello {location.state.firstName}</h4>
                  <div className="normalFont">
                    <Link to="/login">Sign Out</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links to Other Services */}
        <div id="dashboardLinks">
          <div className="dashboardLinks blackLink">
            <Link to="/tbd">Manage Accounts</Link>
          </div>
          <div className="dashboardLinks blackLink">
            <Link to="/tbd">Password Manager</Link>
          </div>

          <div className="dashboardLinks blackLink" id="contactsDL">
            <Link to="/tech-contacts" state={{name:location.state.firstName, email: location.state.email}}>Contacts</Link>
          </div>
        </div>

        <div>
          {/* Form to Submit Emails */}
          <div className="createForm">
            <div className="createRow alignCenter">
              <div>
                <label className="boldFont">Add an Email : </label>
                <input
                  type="email"
                  className="smallMarginLeft"
                  id="email"
                  onChange={(e) => {
                    setLoggedEmail(e.target.value);
                  }}
                  placeholder="Type an Email"
                />
              </div>
              <div>
                <div className="smallMarginLeft">
                  <label className="boldFont">Add a Description : </label>
                  <input
                    type="text"
                    className="smallMarginLeft"
                    id="description"
                    onChange={(e) => {
                      setLoggedDescription(e.target.value);
                    }}
                    placeholder="Type an Email Description"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="smallMarginTop"
              variant="dark"
              onClick={Submit}
            >
              Submit
            </Button>
          </div>
          
          {/* Table to display Emails and Descriptions from database */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{data[index][index][1]} </td>
                  <td>
                    <Link to="/accounts" state={{ name: location.state.firstName, email: location.state.email, subEmail: data[index][index][0], acctDesc: data[index][index][1] }}>
                      {/* onClick={sendUserInfo} */}
                      {data[index][index][0]}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
