import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { backendURL } from "../config";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "../Styles/breachedData.css";

// API Key: 2dde7d1c7206459381b662c456b7fa72

const BreachedData = () => {
  var email = "vi.rubioo@gmail.com";
  const key = "2dde7d1c7206459381b662c456b7fa72";
  const [data, setData] = useState([]);

  // Currently Not Working
  axios
    .get("https://haveibeenpwned.com/api/v3/breachedaccount/", {
      params: {
        account: email,
      },
      headers: {
        "hibp-api-key": "2dde7d1c7206459381b662c456b7fa72",
        "Access-Control-Allow-Origin": true,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

  // Constantly Fetching Data from our json file in our Backend Folder + Calling a service that parses this data
  // Set Data sends data over to the map function in the table below
  var fetchData = () => {
    axios
      .get(backendURL + "/getBreachedData")
      .then((response) => {
        // console.log(response.data);
        console.log(response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="home-logo">
        {/* Logo Text */}
        <Link to="/" className="home-logo removeLinkLine">
          Quiet Feet
        </Link>
      </div>
      <div className="container1">
        <h1 className="smallMarginTop addUniformMargin" id="breachedDataTitle">
          Breached Data
        </h1>

        {/* Table with Breach Data */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Domain</th>
              <th>Breach Date</th>
              <th>Description</th>
              <th>Data Classes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{data[index].Title}</td>
                <td>{data[index].Domain}</td>
                <td>{data[index].BreachDate}</td>
                <td>{data[index].Description}</td>
                <td>{data[index].DataClasses}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BreachedData;