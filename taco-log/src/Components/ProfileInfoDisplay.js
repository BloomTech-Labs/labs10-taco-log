import React, { Component } from "react";

class ProfileInfoDisplay extends Component {
  render() {
    return (
      <div className="p-info-dis">
        <h2 className="p-info-name">{this.props.userInfo.name}</h2>
        <span>Email: {this.props.userInfo.email}</span>
        <span>
          Total Tacos Logged: {this.props.userInfo.user_stats.tacos_logged} 
        </span>
      </div>
    );
  }
}

export default ProfileInfoDisplay;
