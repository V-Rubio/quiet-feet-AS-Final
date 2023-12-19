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
  
  
  const [account,setLoggedAccount]=useState('');
  const [description,setLoggedDescription]=useState('');
  const [data, setData] = useState([]);


//   var fetchData = async () => {
//     await axios.get(backendURL + '/getAccounts', {
//       params: {
//         email: location.state.email
//       }
//     }).then(res => {
//         console.log(res);
//       var dataLength = res.data.account.length;
//       var accounts = res.data.account;
//       var descriptions = res.data.description;
//       var data = [];
//       var account;
//       var description;
//       for(var i = 0 ; i<= dataLength; i++){
//         if (dataLength == 0){
//             account = res.data.account;
//             description = res.data.description;
      
//             data.push({
//               [i]: {
//                 0: account, 
//                 1: description
//               }
//           });
//         } else {
//           if (i == dataLength){
//             break;
//           } else {
//             account = accounts[i];
//             description = descriptions[i];
    
//             data.push({
//               [i]: {
//                 0: account, 
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
              await axios.post(backendURL + "/addAccount",{
                  userEmail, account, description
              })
              .then(res=>{
                  if(res.data==="exist"){
                      alert("Account already in store")
                  }
                  else if(res.data==="notexist" || res.data ==="updated"){
                      alert("Data Added")
                      var account = document.getElementById("account");
                      var description = document.getElementById("description");
                      account.value = '';
                      description.value ='';

                      // Axios Get an array of all listed emails and then display them 

                      axios.get(backendURL + '/getAccounts');
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
            <input type="text" className='smallMarginLeft' id='account' onChange={(e) => { setLoggedAccount(e.target.value) }} placeholder="Type an Account"  />
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
                <tr className="boldFont"><h3 style={{textAlign: 'center'}}>{location.state.subEmail}</h3></tr>
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
