import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import '../../alternatecss.css';
// import '../../untitled-font-1/styles.css'

const Landing = () => (
  <div>
    <div className="navbar" >
        <Link to='/Signin' className="link">Sign in</Link>
        <Link to='/Signup' className="link">Sign Up</Link>
    </div>
    <div className="st-deco" data-icon="&#xf004;"></div>
    {/* <img src={logo} className="st-deco" alt="logo" /> */}
    <div className="h2-abs1"> Tryst </div>
    <p>Dating without the hassle </p>

  </div>
);

export default Landing;
// colours: fa96b5, 