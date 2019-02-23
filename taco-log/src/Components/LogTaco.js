import React, { Component } from "react";
import { firebase } from "../firebase/firebase";

class LogTaco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taco_location: "",
      taco_description: "",
      rating: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newTaco = e => {
    e.preventDefault();
    const taco = {
      user_id: this.props.userInfo.internal_id,
      taco_location: this.state.taco_location,
      taco_description: this.state.taco_description,
      rating: this.state.rating
    };
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        const header = {
          headers: {
            Authorization: idToken,
            id: this.props.userInfo.ext_user_id
          }
        };
        this.props.logTaco(taco, header);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      taco_location: "",
      taco_description: "",
      rating: ""
    });
  };

  render() {
    return (
      <div className="taco-form">
        <p>Log a Taco Here:</p>
        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="location"
            value={this.state.taco_location}
            name="taco_location"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="rating"
            value={this.state.rating}
            name="rating"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="description"
            value={this.state.taco_description}
            name="taco_description"
          />
          <button onClick={this.newTaco}>Submit</button>
        </form>
      </div>
    );
  }
}

export default LogTaco;
