import React, { Component } from 'react';
import './LinkCalendar.css';
import logo from '../logo.svg'


class LinkCalendar extends Component {
	render() {
		return (
			<div className="body">
				<div className="header">
					<img src={logo} className="logo" alt="logo" />
					<h1 className ="great-vibes"> Link your Calendar</h1>
					<button className="button"> Link your Google Calendar </button>
					<button className="button"> Link your iCal</button><br></br>
					Continue
				</div>
			</div>			
			)
	}
}
export default LinkCalendar;