import React, { Component } from "react";
import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

class ProfilePage extends Component {
  state = {
    // username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  // handleChangeUsername = event =>
  //   this.setState({ username: event.target.value });
  // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  // handleProgress = progress => this.setState({ progress });
  // handleUploadError = error => {
  //   this.setState({ isUploading: false });
  //   console.error(error);
  // };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
 
  render() {
    return (
      <div>
 
         <form>
           {/* <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          /> */}
    <CustomUploadButton
        accept="image/*"
        storageRef={firebase.storage().ref('images')}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadSuccess}
        onProgress={this.handleProgress}
        style={{backgroundColor: '#ad244f', 
                color: 'white', padding: 10, borderRadius: 4, width: "50%", textAlign:"center", justifyContent: "center", display:"flex", flexDirection: "column"}}
      >
        Add a profile picture! 
      </CustomUploadButton>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          {/* <FileUploader
            accept="image/*"
            name="Avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          /> */}
        </form>
      </div>
    );
  }
}
 
export default ProfilePage;