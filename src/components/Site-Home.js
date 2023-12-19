import { Link, Outlet } from "react-router-dom";
import '../Styles/site-home.css';


const SiteHome = () => {
return (
    <>
    <div className="home-logo"> 
        Quiet Feet
    </div>
    <div className="container1"> 
        <div id="homeText">
            <div id="trusted">
            Trusted by Millions || Save up to 90%* 
            </div>

            <div id="getE2U"> 
            Get easy-to-use, protection against advanced online threats. Plus online privacy and ID theft protection with select plans.
            </div>

            <div id="getStartedButton"> 
            <Link to="/login" className="button-36 whiteLink" id='getStartedLink'>Get Started</Link>
            <Outlet />
            </div>
        </div>
   
    </div>
    
    <div className="footer"> 
        <br/>
        <div id="footerText"> @1026 imaginary road, Newark, NJ</div>
        
    </div>
    </>
)
}

export default SiteHome;