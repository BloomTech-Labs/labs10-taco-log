import React, { Component } from "react";
import "../css/AchievementCard.css"


class AchievementCard extends Component {
  render() {
    return (
      <div className = "achievement-card">
        <img
        src={this.props.imgsrc}
        className = "achievement-icon"
        id = {this.props.id}
         />
        <div className = "achievement-title">{this.props.title}</div>
        <div className = "achievement-description">{this.props.description}</div>
      </div>
    );
  }
}

export default AchievementCard;
