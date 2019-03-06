import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "../css/ProfileInfoDisplay.css"

class ProfileInfoDisplay extends Component {
  render() {console.log(this.props.userInfo)
    return (
      
      <div>
        {this.props.userInfo.length !== 0 ? (
          <div className="p-info-dis">
          <div className="img-name-container">
            <img className="p-img" src = {this.props.userInfo.photoURL}/>
            <div className="p-info-name">{this.props.userInfo.name}</div>
          </div>
          <div className="p-email-logged-wrap">
            <div className="p-info-email">Email: {this.props.userInfo.email}</div>
            <div className="p-info-logged">
              Total Tacos Logged: {this.props.userInfo.user_stats.tacos_logged}
            </div>
          </div>
            
          </div>
        ) : (
          <div />
        )}
      </div>
      
    );
  }
}

export default ProfileInfoDisplay;
