import React, { Component } from "react";
import { connect } from "react-redux";
import GlobalTacoList from "./GlobalTacoList";
import MyTacoList from "./MyTacoList";
import LandingPageFiller from "./LandingPageFiller";
import taco from '../taco.jpg';
import landingPageCover from "../img/landingpagecover.jpg";
import "../css/landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exptacos: [],
      selectedTab: "global"
    };
  }
  handleToggle = e => {
    this.setState({
      selectedTab: e.target.id
    });
  };

  
  componentDidMount() {
    this.props.GET_TACO();
    let expTacos = [];
    if (this.props.userInfo.taco_logs) {
      for (let i = 0; i < this.props.userInfo.taco_logs.length; i++) {
        let exp = this.props.userInfo.taco_logs[i].special_experience;
        if (exp == 1) {
          expTacos.push(this.props.userInfo.taco_logs[i]);
        }
      }
      this.setState({
        expTacos: expTacos
      });
    }
  }
  render() {
    return (
      <div>
        <div className="img-container">
        <div className="img-intro">
        <h1>Hi there. Welcome to Taco Logs.</h1>
        <h4>Want go go ahead and get started? </h4>
        <h4>Go ahead and login with Google or Facebook to get started!</h4>
        {/* Google login buttons and stuff should be here */}
        <div className="img-leading">
        <h4>If you'd like to learn more, go ahead and scroll down.</h4>
        </div>
        </div>
        </div>
        <div className="tab">
          <div
            onClick={this.handleToggle}
            id="global"
            className={
              this.state.selectedTab === "global"
              ? "selected-tab global-tab"
              : "global-tab"
            }
          >Global Special Experiences
          </div>
          <div
            onClick={this.handleToggle}
            id="local"
            className={
              this.state.selectedTab === "local"
              ? "selected-tab local-tab"
              : "local-tab"
            }
            >My Special Experiences
        </div>
        
        </div>
        <div>
          {this.state.selectedTab === "global" ? ( 
          <GlobalTacoList {...this.props} />
          ) : (
          <MyTacoList {...this.state} />
          )
          }
        </div>
        <div>
          <LandingPageFiller />
        </div>
      </div>
    );
  }
}

export default connect()(Landing);
