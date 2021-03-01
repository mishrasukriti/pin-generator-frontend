import React from "react";
import Login from "../assets/user.png";
import Register from "../assets/manager.png";

import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="navbar-container">
          <nav>
            {/* <div><img className="logoimg" src={logo} alt=""/> </div> */}
            <div className="navlist-container">
             
              <Link to="/login">
              <div><img src={Login} alt=""/></div> <div> Login</div>
              </Link>
              <Link to="/register">
              <div><img src={Register} alt=""/></div> <div>Register</div> 
              </Link>
            </div>
          </nav>
        </div>
       
        <h1 style={{marginTop:"30px", textAlign:"center", fontWeight:"1000"}} >WELCOME TO PIN GENERATOR APP</h1>
        <div className="headliner-container">
          <img style={{ width:"600px"}} className="banner" src={background} alt=""/>
        </div>
      
        <footer>
          Copyrights &copy; PIN-GENERATOR
        </footer>
       
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
