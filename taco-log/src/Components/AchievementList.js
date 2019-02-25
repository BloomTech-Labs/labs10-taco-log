import React, { Component } from "react";
import AchievementCard from "./AchievementCard";

class AchievementList extends Component {
  render() {
    return (
      <div className="achev-list-owrap">
        Achievements:
        {this.props.userInfo.achievements &&
        this.props.userInfo.achievements.length > 0 ? (
          <div>
            {this.props.userInfo.achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default AchievementList;
