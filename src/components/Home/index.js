import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div className="body">
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Link to='/setupprofile' className="App-link">Set Profile</Link>
    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
