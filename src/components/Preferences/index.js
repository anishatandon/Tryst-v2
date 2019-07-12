import React, { Component } from 'react';
import './Preferences.css';


class Preferences extends Component {

	setGender(event) {
    console.log(event.target.value);
  }
	render() {
		return (
			<div className="body">
				<div className="header">
					{/* <img src={logo} className="logo" alt="logo" /> */}
					<h1> Preferences</h1>

					I'm interested in:  <br></br><br></br>
					<div onChange={this.setGender.bind(this)}>
			        <input type="radio" value="WOMEN" name="genderpreference"/> Women <br></br>
			        <input type="radio" value="MEN" name="genderpreference"/> Men <br></br>
			        <input type="radio" value="BOTH" name="genderpreference"/> Both<br></br><br></br>
			      </div>
					Preferred age range: _________ <br></br><br></br><br></br><br></br><br></br><br></br>
					Continue
				</div>
			</div>			
			)
	}
}
export default Preferences;