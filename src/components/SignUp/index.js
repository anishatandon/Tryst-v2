import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import '../../alternatecss.css';
import logo from '../../logo.svg';
import { ADDRGETNETWORKPARAMS } from 'dns';

const SignUpPage = () => (
  <div className = "body">
    <div className="st-deco" data-icon="&#xf004;"></div>
    <div className="h2-abs2">Sign Up</div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  dob: '',
  gender: '',
  genderpref: '',
  agepref: '',
  location: '', 
  pictures: null,
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, dob, gender, genderpref, agepref, location, pictures, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          dob, 
          gender, 
          genderpref, 
          agepref, 
          location, 
          pictures, 
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      dob,
      gender,
      genderpref,
      agepref,
      location, 
      pictures,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div>
          <form onSubmit={this.onSubmit}>
            <input className="input"
              type = "text"
              name="username"
              value={username}
              onChange={this.onChange}
              placeholder="Name (as displayed)"
            /> 
            <input className="input"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input className="input"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />

            <input className="input"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
             <input className="input"
              name="dob"
              value={dob}
              onChange={this.onChange}
              type="text"
              placeholder="when were you born? dd/mm/yyyy"
            />
            {/* <label>
              gender identity? 
              <input type="radio" name="gender" value= {gender} checked={this.state.seoected} /> Male<br></br>
              <input type="radio" name="gender" value={gender}/> Female<br></br>
            </label> */}
            <input className="input"
              name="gender"
              value={gender}
              onChange={this.onChange}
              type="text"
              placeholder="do you identify as male or female?"
            />
            <input className="input"
              name="genderpref"
              value={genderpref}
              onChange={this.onChange}
              type="text"
              placeholder="do you prefer men, women, or both?"
            />
            <input className="input"
              name="location"
              value={location}
              onChange={this.onChange}
              type="text"
              placeholder="how far are you willing to search (in kms)?"
            />
            <input className="input"
              name="agepref"
              value={agepref}
              onChange={this.onChange}
              type="text"
              placeholder="age range? (ex: 18-25)"
            />
    
            <button disabled={isInvalid} type="submit" className="button">
              Sign Up
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </div>
    );
  }
}

const SignUpLink = () => (
  <h1>
    Don't have an account? <Link to={ROUTES.SIGN_UP} className="App-link"><br></br>Sign Up</Link>
  </h1>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
