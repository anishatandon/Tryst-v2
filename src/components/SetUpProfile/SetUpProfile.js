import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import SetUpProfileList from './SetUpProfileList';

import '../Landing/App.css';
import Slider from 'react-rangeslider';

// var database = firebase.database(); 

class SetUpProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dob: '0000',
      gender: 'male',
      genderpref: 'female',
      agepref: 18,
      location: 0, 
      pictures: null,
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  // addProfileInfo(uid, dob, gender, genderpref, agepref, location, pictures) {
  //   var userData = {
  //     dob={dob}, 
  //     gender=gender, 
  //     genderpref=genderpref, 
  //     agepref=agepref, 
  //     location=location,
  //     pictures=pictures 
  //   };

  //   // get a new key for the new profile 
  //   var newProfileKey = firebase.database().ref().child('users').push.key();

  //   // wrtie the new post data to the user 
  //   var updates = {};
  //   updates['/users/' + newProfileKey] = userData

  //   return firebase.database().ref().update(updates);
  // }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const SetUpProfileList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: SetUpProfileList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { dob, gender, genderpref, agepref, location, pictures, text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage} className="button">
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <SetUpProfileList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
            <h1> when were u born </h1> 
            <input className="input"
            type = "date"
            name="date of birth"
            value={dob}
            onChange={this.onChange}
            placeholder="Birth?"
            /> 
            <h1>gender</h1>
            <input type="radio" name="gender" value= {gender}/> Male<br></br>
            <input type="radio" name="gender" value={gender}/> Female<br></br>
            
            <h1>gender preference</h1>
            <input type="radio" name="gender preference" value= {genderpref}/> Male<br></br>
            <input type="radio" name="gender preference" value={genderpref}/> Female<br></br>
            <input type="radio" name="gender preference" value={genderpref}/> Both<br></br>
        {/* age range, location, pictures */}

            <h1>Min age range</h1>
            <input className="input"
              type="number"
              name="agepref"
              value={agepref}
              onChange={this.onChange}
              placeholder="age preference format: 1850"
            />

            <h1>Location range</h1>
            <input className="input"
              type="number"
              name="location"
              value={location}
              onChange={this.onChange}
              placeholder="location preference format: 1850"
            />

            <input className="input" alt="image"
              type="image"
              name="pictures"
              value={pictures}
              onChange={this.onChange}
              placeholder="upload image"
            />
              <button type="submit" className="button">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(SetUpProfile);
