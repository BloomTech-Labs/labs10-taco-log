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
        <p>{this.props.taco_description}</p>
        <p>{this.props.rating}</p>
        <button onClick={() => this.deleteTaco(this.props.id)}>Delete</button>
      </div>
    );
  }
}

export default TacoCard;
