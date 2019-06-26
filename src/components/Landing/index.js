import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';


const Landing = () => (
  <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h2 className = {"great-vibes"}>
          Tryst
          </h2>
          <body className="garamond-h3">
            Dating without the hassle <br></br><br></br>
          <Link to='/SignUp' className="App-link">Sign Up</Link><br></br><br></br>
          <Link to='/Login' className="App-link">Log in</Link>
          </body>
      </header></div>
);

export default Landing;
