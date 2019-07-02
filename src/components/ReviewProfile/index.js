import React, { Component } from 'react';
import './ReviewProfile.css';
import logo from '../logo.svg'
import picture from '../frankocean.jpg'


class ReviewProfile extends Component {
	render() {
		return (
			<div className="body">
				<div className="header">
					<img src={logo} className="logo" alt="logo" />
					<h1> Review your Profile</h1>
					<img src={picture} className="photo" alt="picture" /> <br></br>
					Name: _________________ <br></br><br></br>
					Date of Birth: <br></br><br></br>
					Gender orientation: <br></br><br></br>
					I am interested in: <br></br><br></br>
					Preferred age range: ___________<br></br><br></br><br></br><br></br><br></br>
					          Continue
				</div>
			</div>			
			)
	}
}
export default ReviewProfile;