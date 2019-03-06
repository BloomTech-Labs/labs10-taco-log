import React, { Component } from "react";
import "../css/tacoCard.css";
// import {
//   Card,
//   CardImg,
//   CardBody,
//   Button,
//   CardTitle
// } from 'reactstrap';
import { firebase } from "../firebase/firebase";

class TacoCard extends Component {
  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    return (
      <div className= "review-container">
        <div className= "reviews">
          <span>{this.props.taco_location}</span>
          <span>{this.props.taco_name}</span>
          <span>{this.props.rating}</span>
          <span>{this.props.tortilla}</span>
          <span>{this.props.meat}</span>
          <span>{this.props.cheese}</span>
          <span>{this.props.salsa}</span>
          <span>{this.props.created_at}</span>
          <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default TacoCard;
