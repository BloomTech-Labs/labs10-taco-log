import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "../css/ProfileInfoDisplay.css"

class ProfileInfoDisplay extends Component {
  render() {console.log(this.props.userInfo)
    return (
      <Card>
      <div>
        {this.props.userInfo.length !== 0 ? (
          <CardBody className="p-info-dis">
          <div className="img-name-container">
            <img className="p-img" src = {this.props.userInfo.photoURL}/>
            <CardTitle className="p-info-name">{this.props.userInfo.name}</CardTitle>
          </div>
          
            <CardTitle>Email: {this.props.userInfo.email}</CardTitle>
            <CardTitle>
              Total Tacos Logged: {this.props.userInfo.user_stats.tacos_logged}
            </CardTitle>
          </CardBody>
        ) : (
          <div />
        )}
      </div>
      </Card>
    );
  }
}

export default ProfileInfoDisplay;
