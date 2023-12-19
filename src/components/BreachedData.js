import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { backendURL } from '../config';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import '../Styles/breachedData.css';
// const client = axios.create({
//     baseURL: "https://haveibeenpwned.com/api/v2/breachedaccount/" 
//   });

// API Key: 2dde7d1c7206459381b662c456b7fa72

const BreachedData = () => {
    var email = 'vi.rubioo@gmail.com';
    const key = '2dde7d1c7206459381b662c456b7fa72';
    const [data, setData] = useState([]);

    axios.get("https://haveibeenpwned.com/api/v3/breachedaccount/", {
      params: {
        account: email
      },
      headers: {
        'hibp-api-key': '2dde7d1c7206459381b662c456b7fa72', 
        'Access-Control-Allow-Origin': true
      }
    }).then(response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });

    // curl -H "hibp-api-key:fe40a806af674758bb217f05ccd4575d" -H "user-agent: Beyond the Frame" -sS https://haveibeenpwned.com/api/v3/breachedaccount/d%40schmud.de?truncateResponse=false -o "/pwned-accounts.json"
   

    // var fetchData = async () => {
    //   // var userEmail = inputRef.current.innerHTML;
    //   // axios.get("https://haveibeenpwned.com/api/v2/breachedaccount/" + email).then(
    //   //   res => {
    //   //   console.log(res);
    //   //   // setData(res.data);
      
    //   // })
    // };
    // useEffect(() => {
    //   fetchData();
    // }, []);

    var fetchData = () => {
      axios.get(backendURL + '/getBreachedData').then(response => {
        // console.log(response.data);
        console.log(response.data)
        setData(response.data);
      }).catch(e => {
        console.log(e);
      })

    };
    useEffect(() => {
      fetchData();
    }, []);


        //   useEffect(() => {
        //     client.get(user).then((response) => {
        //     //    setPosts(response.data);
        //     console.log(response.data);
        //     });
        //  }, []);

    return(
        <>
        <div className="home-logo">
          <Link to="/" className="home-logo removeLinkLine">
            Quiet Feet
          </Link>
       </div>
       <div className='container1'>
            <h1 className="smallMarginTop addUniformMargin" id='breachedDataTitle'>Breached Data</h1>
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
                        {/* <td>{data[index][0]}</td>
                        <td>{data[index][1]}</td>
                        <td>{data[index][2]}</td>
                        <td>{data[index][3]}</td> */}
                        <td>{data[index].Title}</td>
                        <td>{data[index].Domain}</td>
                        <td>{data[index].BreachDate}</td>
                        <td>{data[index].Description}</td>
                        <td>{data[index].DataClasses}</td>
                      </tr>
                  ))}
              </tbody>
        </Table>
            {/* <ul>
        {
          this.state.data
            .map(data =>
              <li key={data.Domain}>{data.BreachDate}</li>
            )
        }
      </ul> */}

  </div>
        </>
    )
}

export default BreachedData;