import React, { Component } from "react";
import tacoColor from "../img/taco-color.png";
import tacoGrey from "../img/taco-grey.png";

class TacoCard extends Component {
  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    return (
      <div>
        <p>{this.props.taco_location}</p>
        <p>{this.props.taco_name}</p>
        <p>          
          <img
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
        </p>
        <p>{this.props.tortilla}</p>
        <p>{this.props.meat}</p>
        <p>{this.props.cheese}</p>
        <p>{this.props.salsa}</p>
        <p>{this.props.created_at}</p>
        <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button>
      </div>
    );
  }
}

export default TacoCard;
