import React, { Component } from "react";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import TacoList from "./TacoList";
import AchievementList from "./AchievementList";
import { connect } from "react-redux";


class ProfilePage extends Component {
  state = {
    selectedTab: "logs"
  };

  handleToggle = e => {
      
    this.setState({
      selectedTab: e.target.id
    });
  };
  render() {console.log(this.props)
    return (
      <div className="home-page">
        <header className="App-header">
          <ProfileInfoDisplay {...this.props} />
          <div>
            <div
              onClick={this.handleToggle}
              id="logs"
              className={
                this.state.selectedTab === "logs"
                  ? "selected-tab profile-tab"
                  : "profile-tab"
              }
            >
              My Log
            </div>
            <div
              onClick={this.handleToggle}
              id="badges"
              className={
                this.state.selectedTab === "badges"
                  ? "selected-tab profile-tab"
                  : "profile-tab"
              }
            >
              My Badges
            </div>
          </div>
          {this.state.selectedTab === "logs" ? (
            <TacoList {...this.props} />
          ) : (
            <AchievementList {...this.props} />
          )}
        </header>
      </div>
    );
  }
}

export default connect()(ProfilePage);
