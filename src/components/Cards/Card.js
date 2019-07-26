import React, { Component } from "react";
import { render } from 'react-dom'; 
import { Card, CardWrapper } from 'react-swipeable-cards';
import { geolocated } from "react-geolocated"; 

import '../Cards/cards.css'; 

class Cards extends Component {
  render() {
    // const wrapperStyle = {
    //   backgroundColor: "#ad244f"
    // }
    
    // const cardStyle = {
    //   backgroundColor: "#ad244f"
    // }
    // return(
    //   <CardWrapper style={wrapperStyle}>
    //     <Card style={cardStyle}>
    //       Hillary, 20, Claremont
    //       <img src={require('../Cards/hillary.PNG')} />        </Card>
    //   </CardWrapper>
    // );
  // }

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : this.props.coords ? (
      <table>
          <tbody>
              <tr>
                  <td>latitude</td>
                  <td>{this.props.coords.latitude}</td>
              </tr>
              <tr>
                  <td>longitude</td>
                  <td>{this.props.coords.longitude}</td>
              </tr>
              <tr>
                  <td>altitude</td>
                  <td>{this.props.coords.altitude}</td>
              </tr>
              <tr>
                  <td>heading</td>
                  <td>{this.props.coords.heading}</td>
              </tr>
              <tr>
                  <td>speed</td>
                  <td>{this.props.coords.speed}</td>
              </tr>
          </tbody>
      </table>
  ) : (
      <div>Getting the location data&hellip; </div>
  );
}
  }
  export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Cards);


// export default Cards;