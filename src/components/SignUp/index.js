import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as firebase from "firebase";
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import '../../alternatecss.css';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Button } from 'semantic-ui-react';


const SignUpPage = () => (
  <div className = "body">
    <div className="st-deco" data-icon="&#xf004;"></div>
    <div className="h2-abs2">Sign Up</div>
    <SignUpForm />
    {/* <ProfilePage /> */}
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
  isAdmin: false,
  error: null,
  filenames: [],
  downloadURLs: [],
  isUploading: false,
  uploadProgress: 0, 
  interests: []
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
    const { username, email, passwordOne, dob, gender, genderpref, agepref, location, isAdmin, filenames, downloadURLs, isUploading, uploadProgress, interests} = this.state;
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
          roles,
          filenames, 
          downloadURLs, 
          isUploading, 
          uploadProgress, 
          interests
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

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  handleClick = () => {
    const interestArray = this.state.interests.slice(0);

    interestArray.push({
      name: 'Social Service'
    });
    this.setState({
        interests: interestArray,
    });
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
      isAdmin,
      error,
      filenames, 
      downloadURLs, 
      isUploading, 
      uploadProgress
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
            <CustomUploadButton
                accept="image/*"
                name="image-uploader-multiple"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                multiple
                style={{backgroundColor: "#ad244f", color: 'white', width:"50%"}}>
                  Upload photos for your profile! 
              </CustomUploadButton>
              {/* <p>Progress: {this.state.uploadProgress}</p>
              <p>Filenames: {this.state.filenames.join(", ")}</p> */}
              <div>
              <h1>
              Pick your interests: </h1>
            <button className="button-2" id="Social Service" onClick={() => this.handleClick(Button)}>Social Service</button>
					<button className="button-2" id="Outdoor activities">Outdoor activities</button>
					<button className="button-2" id = "Theater">Theater</button>
					<button className="button-2" id="Film">Film</button>
					<button className="button-2" id="Sports">Sports</button>
					<button className="button-2" id="Music">Music</button>
					<button className="button-2" id="Business">Business</button>
					<button className="button-2" id="Politics">Politics</button>
					<button className="button-2" id="Technology">Technology</button>
            </div>
        
        <div>
          {this.state.downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })}
        </div>
            <button disabled={isInvalid} type="submit" className="button">
              <h1>Sign Up</h1>
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
