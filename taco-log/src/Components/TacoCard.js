import React, { Component } from "react";
import { firebase } from "../firebase/firebase";
import tacoColor from "../img/taco-color.png";
import tacoGrey from "../img/taco-grey.png";
import "../css/tacoCard.css";



class TacoCard extends Component {
  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    return (
      <div className = "taco-card-wrap">
        <div className = "taco-card-title">{this.props.taco_location}</div>
        <div className = "taco-card-address">{this.props.address}</div>
        <div className = "rating-icons">          
            src={this.props.rating >= 1 ? tacoColor : tacoGrey}
            className="taco-icon"
            id="1"
            alt = "taco-icon"
          />
          <img
            src={this.props.rating >= 2 ? tacoColor : tacoGrey}
            className="taco-icon"
            id="2"
            alt = "taco-icon"
          />
          <img
            src={this.props.rating >= 3 ? tacoColor : tacoGrey}
            className="taco-icon"
            id="3"
            alt = "taco-icon"
          />
          <img
            src={this.props.rating >= 4 ? tacoColor : tacoGrey}
            className="taco-icon"
            id="4"
            alt = "taco-icon"
          />
          <img
            src={this.props.rating >= 5 ? tacoColor : tacoGrey}
            className="taco-icon"
            id="5"
            alt = "taco-icon"
          />
        </div>        
        <p>{this.props.created_at}</p>
        {/* <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button> */}
      </div>
    );
  }
}

export default TacoCard;
