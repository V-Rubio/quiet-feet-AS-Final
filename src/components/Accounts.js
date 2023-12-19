import { useLocation, useNavigate, Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import {backendURL} from '../config.js';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import '../Styles/home.css';
import '../App.css';
import Button from 'react-bootstrap/Button';

function Accounts(props) {
  const location = useLocation();
  var inputRef = useRef(null);
  
  
  const [email,setLoggedEmail]=useState('');
  const [description,setLoggedDescription]=useState('');
  const [data, setData] = useState([]);


//   var fetchData = async () => {
//     await axios.get(backendURL + '/getEmails', {
//       params: {
//         email: location.state.email
//       }
//     }).then(res => {
//       // var userID = res.data.id;
//       // var data = res.data;
//       var dataLength = res.data.email.length;
//       var emails = res.data.email;
//       var descriptions = res.data.description;
//       var data = [];
//       var email;
//       var description;
//       for(var i = 0 ; i<= dataLength; i++){
//         if (dataLength == 0){
//             email = res.data.email;
//             description = res.data.description;
      
//             data.push({
//               [i]: {
//                 0: email, 
//                 1: description
//               }
//           });
//         } else {
//           if (i == dataLength){
//             break;
//           } else {
//             email = emails[i];
//             description = descriptions[i];
    
//             data.push({
//               [i]: {
//                 0: email, 
//                 1: description
//               }
//           });
//           }
          
//         }
        
//       }
//       setData(data);

//     })
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

    async function Submit(e){
      var userEmail = location.state.email;
      
      e.preventDefault();
          try{
              await axios.post(backendURL + "/addEmail",{
                  userEmail, email, description
              })
              .then(res=>{
                  if(res.data==="exist"){
                      alert("Email already in store")
                  }
                  else if(res.data==="notexist" || res.data ==="updated"){
                      alert("Data Added")
                      var email = document.getElementById("email");
                      var description = document.getElementById("description");
                      email.value = '';
                      description.value ='';

                      // Axios Get an array of all listed emails and then display them 

                      axios.get(backendURL + '/getEmails');
                      window.location.reload();
                  }
              })
              .catch(e=>{
                  alert("wrong details")
                  console.log(e);
              })
          }
          catch(e){
              console.log(e);
          }
  }

  return (
    <>
    <div className="homepage">

    <div className="container2 ">
      <div className="whiteLink smallMarginBottom ">
                <div className="home-logo" id="QFD">
                  <div className="createRow">
                    <div><Link to="/">Quiet Feet</Link></div>
                    <div className="alignRight hugeMarginLeft"> <h4>Hello {location.state.name}</h4>
                    <div className="normalFont"><Link to="/login">Sign Out</Link></div></div>
                  </div> 
                    
                    
                </div>

                </div>
              </div>
              <div id="dashboardLinks"> 
                    <div className="dashboardLinks blackLink">
                        <Link to="/home" state={{firstName: location.state.name, email: location.state.email}}>Home</Link>
                        
                    </div>
                    <div className="dashboardLinks blackLink"> 
                        <Link to="/breached-data">Breached Data</Link>
                        
                    </div>

                    <div className="dashboardLinks blackLink" id="contactsDL"> 
                        <Link to="/tech-contacts">Contacts</Link>
                
                    </div>
            </div>  


    <div>
      <div className="createForm">
        <div className="createRow alignCenter"> 
          <div>
            <label className="boldFont">Add an Account : </label>
            <input type="email" className='smallMarginLeft' id='email' onChange={(e) => { setLoggedEmail(e.target.value) }} placeholder="Type an Email"  />
            </div>
          <div>
            <div className="smallMarginLeft">
            <label className="boldFont">Add a Description : </label>
            <input type="text" className='smallMarginLeft' id='description' onChange={(e) => { setLoggedDescription(e.target.value) }} placeholder="Type an Email Description"  /></div>
          </div>        
        </div>
        {/* <input type="submit" className="smallMarginTop" onClick={Submit} /> <br/><br/> */}
        <Button type="submit" className="smallMarginTop" variant="dark" onClick={Submit}>Submit</Button>
      </div>
      {/* <Link to='/breached-data'> <h1>{location.state.id}</h1></Link> */}
      <Table striped bordered hover> 
            <thead>
                <tr>
                    <th>Accounts</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {/* {data.map((item, index) => (
                    <tr key={index}>
                      <td>{data[index][index][1]} </td>
                      <td><Link to='/breached-data'>{data[index][index][0]}</Link></td>
                    </tr>
                ))} */}
            </tbody>
        </Table>

      </div>
    </div>
    </>
  );
}

export default Accounts;
