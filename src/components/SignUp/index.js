import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import '../Landing/App.css';
import logo from '../../logo.svg';


const SignUpPage = () => (
  <div className = "body">
    <img src={logo} className="logo" alt="logo" />
    <h1 className="great-vibes">Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  dob: '',
  gender: 'male',
  genderpref: 'female',
  agepref: 18,
  location: 0, 
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
            name="please just work"
            value={email}
            onChange={this.onChange}
            />
            <label>
              when were you born?
              <input className="input"
                type = "date"
                name="date of birth"
                value={dob}
                onChange={this.onChange}
                placeholder="Birth?"
              /> 
            </label>
            <label>
              gender identity? 
              <input type="radio" name="gender" value= {gender}/> Male<br></br>
              <input type="radio" name="gender" value={gender}/> Female<br></br>
            </label>

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
