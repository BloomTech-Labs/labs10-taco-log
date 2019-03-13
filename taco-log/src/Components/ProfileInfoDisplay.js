import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "../css/ProfileInfoDisplay.css";
import tacoColor from "../img/taco-color.png";

class ProfileInfoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      modal: false
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.userInfo.username,
      email: this.props.userInfo.email
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitChanges = id => {
    const changes = {
      username: this.state.username,
      email: this.state.email
    };
    this.props.updateUser(id, changes);
    this.setState({ username: "" });
  };

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="p-info-top">
        <div className="p-info-dis">
          {/* <img className="p-img" src={this.props.userInfo.photoURL} /> */}
          <div className="p-info-content">
            {/* <div className="dummy-img" /> */}
            <img className="p-img" src={this.props.userInfo.photoURL} />
            <div className="info-column">
              <div className="p-info-name">{this.props.userInfo.name}</div>
              <div className="p-info-email">{this.props.userInfo.email}</div>
              <div className="p-info-logged">
                <img src={tacoColor} className="p-info-logged-img" />
                <span>{this.props.userInfo.user_stats.tacos_logged}</span> Tacos Logged
              </div>
            </div>
            <div className="edit-column">
              <div>
                <img
                  onClick={() => this.toggleModal()}
                  src={require("../img/edit-icon.png")}
                  className="edit-icon"
                />
                <span>Update Your Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfoDisplay;
