import React, { Component } from 'react';
import './questions.css';
import logo from '../logo.svg'

class Questions extends Component {

		handleClick() {
		document.getElementById("demo").style.color = "red";
		document.getElementById("demo").width = "200px";
		document.getElementById("demo").height = "200px";
		}

	render() {
		return( 
			<div className="body">
				<div className="header">
				  <img src={logo} className="logo" alt="logo" />
			
					<h1>Pick up to 5 areas of interests!</h1>

					<button class="button" id="demo" onclick="handleClick()">Social Service</button>
					<button class="button">Outdoor activities</button>
					<button class="button">Theater</button>
					<button class="button" >Film</button>
					<button class="button">Chess</button>
					<button class="button">Music</button>
					<button class="button">Business</button>
					<button class="button">Sports</button>
					<button class="button">Politics</button><br></br><br></br>
					Continue
					</div>
			</div> 

			 )
	}
}
export default Questions;
