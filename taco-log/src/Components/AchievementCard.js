import React, { Component } from "react";


class AchievementCard extends Component {
  render() {
    return (
      <div>
        <p>Achievement:{this.props.title}</p>
        <p>Description:{this.props.description}</p>
      </div>
    );
  }
}

export default AchievementCard;
