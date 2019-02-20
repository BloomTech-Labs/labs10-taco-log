import React, { Component } from "react";
import axios from "axios";
const host = "https://taco-log-backend.herokuapp.com/api/tacos/";

class LogTaco extends Component {
  constructor() {
    super();
    this.state = {
      taco_location: "",
      taco_description: "",
      rating: "",
      user_id: "1"
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newTaco = e => {
    e.preventDefault();
    axios
      .post(host, this.state)
      .then(
        this.setState({
          taco_location: "",
          taco_description: "",
          rating: ""
        })
      )
      .catch(err => {
        console.log(err.response);
      });
  };
  render() {
    return (
      <form onSubmit={this.newTaco}>
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
        <button>Submit</button>
      </form>
    );
  }
}

export default LogTaco;
