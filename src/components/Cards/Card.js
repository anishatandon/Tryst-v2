import React, { Component } from "react";
import { render } from 'react-dom'; 
import { Card, CardWrapper } from 'react-swipeable-cards';

import '../Cards/cards.css'; 

class Cards extends Component {
  render() {
    const wrapperStyle = {
      backgroundColor: "#024773"
    }
    
    const cardStyle = {
      backgroundColor: "#059FFF"
    }
    return(
      <CardWrapper style={wrapperStyle}>
        <Card style={cardStyle}>
          Hello World!
          <img src={require('../Cards/hillary.PNG')} />        </Card>
      </CardWrapper>
    );
  }
}

export default Cards;