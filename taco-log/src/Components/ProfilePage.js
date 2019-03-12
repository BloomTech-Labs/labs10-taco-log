import React, { Component } from "react";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import TacoList from "./TacoList";
import AchievementList from "./AchievementList";
import { connect } from "react-redux";
import "../css/ProfilePage.css"

class ProfilePage extends Component {
  state = {
    selectedTab: "logs",
    user: null
  };

  handleToggle = e => {
    this.setState({
      selectedTab: e.target.id
    });
  };
  loginPush() {    
    this.props.history.push("/");
    this.props.locationChange();
  }

  // componentWillMount () {
  //   this.setState({user:localStorage})
  // }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.userInfo.length !== 0 ? (
          <div className="profile-page">
            
              <ProfileInfoDisplay {...this.props} />
              <div className = "log-badges-switch">
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
            
          </div>
        ) : (
          this.loginPush()
        )}
      </div>
    );
  }
}

export default connect()(ProfilePage);
