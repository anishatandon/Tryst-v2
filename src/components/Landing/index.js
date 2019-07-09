import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
// import './App.css';
import '../../alternatecss.css';

const Landing = () => (
    <div className="navbar" >
      {/* <section className="st-container"> */}
      {/* <a href = "#home" class = "active"> Home </a> */}
        <Link to='/Signin' className="link">Sign in</Link>
    </div>
      //     {/* <input type="radio" name="radio-set" id="st-control-2"/> */}


      //     {/* <input type="radio" name="radio-set" id="st-control-2"/> */}
      //     <Link to='/Signup' className="App-link">Sign Up</Link>


      //     <img src={logo} className="logo" alt="logo" />
      //     <h1> Tryst </h1>
      //     <h2>Dating without the hassle </h2>

      // {/* </section>  */}

      // <div className = "text">
      //   <h2 className = {"great-vibes"}>
      //     Tryst
      //     </h2>
      //       Dating without the hassle <br></br><br></br>
      //     <Link to='/SignUp' className="App-link">Sign Up</Link><br></br><br></br>
      //     <Link to='/Signin' className="App-link">Log in</Link>
      // </div>
);

export default Landing;
