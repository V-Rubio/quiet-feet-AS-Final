import React from "react"
import {useLocation, useNavigate, Link} from 'react-router-dom';

function Home (){
    const location=useLocation()

    return (
        <div className="homepage">

            <h1>Hello {location.state.id} and welcome to the home</h1>
            <Link to="/">Sign Out</Link>

        </div>
    )
}

export default Home