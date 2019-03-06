import React, { Component } from "react";


class AchievementCard extends Component {
  render() {
    return (
      <div>
        <img
        src={this.props.imgsrc}
        className = "achievement-icon"
        id = {this.props.id}
         />
        <p>Achievement:{this.props.title}</p>
        <p>Description:{this.props.description}</p>
      </div>
    );
  }
}

export default AchievementCard;
