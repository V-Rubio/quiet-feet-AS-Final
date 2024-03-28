// import '../Contacts.css'
import { Link, useLocation } from "react-router-dom";
import contactInfo from "../Quiet Feet Contacts.csv";
import * as Papa from "papaparse";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../Styles/contacts.css";
import Button from "react-bootstrap/Button";

// Pulling out Tech Contacts from our database to present to our customers to relaible respond and contact tech support
const Contacts = () => {
  var [results, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [searchString, setSearch] = useState("");
  const location = useLocation();

  // Searching Strings and Numbers against Contacts we have stored --> then displaying them
  function search(e) {
    e.preventDefault();
    var found = false;
    var indexFound;
    var indexsFound = [];
    var multipleFound = false;

    for (var i = 0; i < Object.keys(data).length; i++) {
      var companyName = data[i][0];
      var companyNumber = data[i][1];
      companyNumber += data[i][2];

      if (companyName.toLowerCase() == searchString.toLowerCase()) {
        found = true;
        indexFound = i;
        break;
      }
      if (companyNumber.includes(searchString)) {
        multipleFound = true;
        indexsFound.push(i);
      }
    }

    // Bug - Returning Only one result because the table is not configured to handle multiple objects
    if (multipleFound) {
      for (var i = 0; i < indexsFound.length; i++) {
        results.push(data[indexsFound[i]]);
      }
      setData(results);
    } else if (found) {
      results.push(data[indexFound]);
      setData(results);
    } else {
      results.push("No Company Found");
      setData(results);
    }
    document.getElementById("searchString1").value = "";
    document.getElementById("searchString2").value = "";
    // email.value = '';
    return results;
  }

  // Consistently Updating to check data | This is parsing from a file saved and imported above - "contactInfo"
  // set Data sends over data to our map function in our table below
  var fetchData = () => {
    Papa.parse(contactInfo, {
      download: true,
      complete: function (results) {
        setData(results.data);
      },
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Logo Display */}
      <div className="home-logo">
        <Link to="/" className="home-logo removeLinkLine">
          Quiet Feet
        </Link>
      </div>
      <div className="container1" id="contactsItems">
        <br />
        <h1> Find Tech Contacts </h1>

        {/* Search Queries */}
        <div className="addMargin-top">
          <div className="">
            <div className="row">
              <div className="leftAlignLabels col-sm">
                <label className="boldFont">
                  Search Company Names:{" "}
                  <input
                    type="text"
                    name="name"
                    id="searchString1"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search"
                    required
                  />
                </label>
                <br />
                <Button
                  className="smallMarginTop"
                  id="searchString"
                  onClick={search}
                  variant="dark"
                >
                  Search
                </Button>
              </div>

              <br />
              <div className="leftAlignLabels col-sm">
                <label className="boldFont">
                  Search Numbers:{" "}
                  <input
                    type="text"
                    name="number"
                    id="searchString2"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search"
                    required
                  />
                </label>
                <div>
                  <Button
                    className="smallMarginTop"
                    id="searchString"
                    onClick={search}
                    variant="dark"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <Button onClick={fetchData} variant="dark">
            Refresh Search
          </Button>
          <br />
          <br />

          {/* Table Display of All Contacts and Search Results */}
          <div results={results}>
            <Table striped bordered hover>
              <thead>
              <tr>
              <th> </th>
              <th>
              <div></div>
              </th>
              <th></th>
              {/* State sends variables to that link */}
              <th className="blackLink"><Link to={'/home'} state={{firstName: location.state.name, email: location.state.email}}>Return Home</Link></th>
              <th></th>

            </tr>
                <tr>
                  <th>Company</th>
                  <th>Number</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Stock Symbol</th>
                </tr>
              </thead>

              {/* Mapping the Contacts based on the parsed file */}
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{data[index][0]}</td>
                    <td>
                      {data[index][1]}
                      {data[index][2]}
                    </td>
                    <td>{data[index][3]}</td>
                    <td>{data[index][4]}</td>
                    <td>{data[index][7]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
