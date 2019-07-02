import React, { Component } from 'react';
import './Profile.css';
import logo from '../logo.svg'


class Profile extends Component {
	render() {
		return (
			<div className="body">
				<div className="header">
					<img src={logo} className="logo" alt="logo" />
					<h1> Set up your Profile</h1>
					Name: _________________ <br></br><br></br>
					Date of Birth: <br></br><br></br>
					Gender orientation: <br></br><br></br>
					Upload up to 4 pictures: <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
					Continue
				</div>
			</div>			
			)
	}
}
export default Profile;
