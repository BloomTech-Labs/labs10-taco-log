import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

class ProfileInfoDisplay extends Component {
  render() {
    return (
      <Card>
      <div>
        {this.props.userInfo.length !== 0 ? (
          <CardBody className="p-info-dis">
            <CardTitle className="p-info-name">{this.props.userInfo.name}</CardTitle>
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
