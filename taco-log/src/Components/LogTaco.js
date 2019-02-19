import React, { Component } from "react";
const host = "http://localhost:5000/api/tacos";

class LogTaco extends Component {
    constructor() {
        super();
        this.state = {
            taco_location: "",
            taco_description: "",
            rating: ""
        }
    }
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      newTaco = e => {
        e.preventDefault();
        axios.post(host, this.state).then(
          this.setState({
            taco_location: "",
            taco_description: "",
            rating: ""
          })
        );
      };
    render () {
        return (
            <form onSubmit={this.newTaco}>
            <input
              onChange={this.handleInputChange}
              placeholder="location"
              value={this.taco_location}
              name="taco_location"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="description"
              value={this.taco_description}
              name="taco_description"
            />
            <input
              onChange={this.handleInputChange}
              placeholder="description"
              value={this.taco_description}
              name="taco_description"
            />
            <button>Submit</button>
          </form>
        );
    }
}

export default LogTaco;