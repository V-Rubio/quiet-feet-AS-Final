// import '../Contacts.css'
import { Link } from "react-router-dom";
import contactInfo from "/Users/vi.rubio/Desktop/Final Quiet Feet/quiet-feet/src/Quiet Feet Contacts.csv";
import * as Papa from "papaparse";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import '../Styles/contacts.css';
import Button from 'react-bootstrap/Button';

const Contacts = () => {
  var [results, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [searchString, setSearch] = useState("");


   function search(e){
        e.preventDefault();
        var found = false;
        var indexFound;
        var indexsFound=[];
        var multipleFound = false;

        for (var i = 0; i <Object.keys(data).length; i++){
            var companyName = data[i][0];
            var companyNumber = data[i][1];
                companyNumber += data[i][2];

            if (companyName.toLowerCase() == searchString.toLowerCase()){
                found = true;
                indexFound = i;
                break;
            } 
            if (companyNumber.includes(searchString)){
                multipleFound = true;
                indexsFound.push(i);
            } 
        }
  
        // Bug - Returning Only one result because the table is not configured to handle multiple objects
        if (multipleFound){
            for (var i = 0; i< indexsFound.length; i++){
                results.push(data[indexsFound[i]]);
            }
            setData(results);
        }else if(found){
            results.push(data[indexFound]);
            setData(results);
        } else {
            results.push("No Company Found");
            setData(results);
        }
        document.getElementById("searchString1").value= '';
        document.getElementById("searchString2").value= '';
        // email.value = '';
        return results;  
        
                     
  }

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
      <div className="home-logo">
        <Link to="/" className="home-logo removeLinkLine">
          Quiet Feet
        </Link>
        {/* <br/>
        <Link to="/home">
          Dashboard
        </Link> */}
      </div>
      <div className="container1" id="contactsItems">
        <br />
        <h1> Find Tech Contacts </h1>
        
        <div className="addMargin-top">
        <div className="">
            <div className="row"> 
                <div className="leftAlignLabels col-sm">
                    <label className="boldFont">
                    Search Company Names: {" "}
                    <input type="text" name="name" id="searchString1" onChange={(e) => {
                    setSearch(e.target.value);
                    }} placeholder="Search" required />
                    </label>
                    <br />
                    <Button className="smallMarginTop" id="searchString" onClick={search} variant="dark">Search</Button>
                </div>
                
                <br />
                <div className="leftAlignLabels col-sm">
                    <label className="boldFont">
                    Search Numbers: {" "}
                    <input type="text" name="number" id="searchString2" onChange={(e) => {
                    setSearch(e.target.value);
                    }} placeholder="Search" required />
                    </label>
                    <div>
                        <Button className="smallMarginTop" id="searchString" onClick={search} variant="dark">Search</Button>
                     </div>
                </div>
            </div>
        </div>
        <br />
        <br/>
        <Button onClick={fetchData} variant="dark">Refresh Search</Button>
        <br/>
        <br/>
<div results={results}>
            <Table striped bordered hover> 
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Stock Symbol</th>
                </tr>
            </thead>
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
