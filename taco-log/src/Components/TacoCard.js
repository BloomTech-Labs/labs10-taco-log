import React, { Component } from "react";
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
      <div>
        <p>{this.props.taco_location}</p>
        <p>{this.props.taco_name}</p>
        <p>{this.props.rating}</p>
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
