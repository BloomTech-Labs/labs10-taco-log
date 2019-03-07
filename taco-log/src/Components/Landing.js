import React, { Component } from "react";
import { connect } from "react-redux";
import GlobalTacoList from "./GlobalTacoList";
import MyTacoList from "./MyTacoList";
import { Fade } from 'reactstrap';
import taco from '../taco.jpg';
import google from '../google.png';
import facebook from '../facebook.png';
import "../css/landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exptacos: [],
      selectedTab: "global",
      fadeIn: false
    };
    this.toggleFade = this.toggleFade.bind(this);
  }

  handleToggle = e => {
    this.setState({
      selectedTab: e.target.id
    });
  };

  toggleFade() {
    this.setState({
        fadeIn: !this.state.fadeIn
    });
}

  
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
          <img className="taco-img" src={taco} alt="taco image" />
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
       
       <div className="mid-section">
          <div>
            {this.state.selectedTab === "global" ? ( 
            <GlobalTacoList {...this.props} />
            ) : (
            <MyTacoList {...this.state} />
            )
            }
          </div>
          <div className="blurb"> 
            <span className="blurb-text">Taco Log is the go to place for taco connoisseurs to keep track of their taco experiences and even earn Taco-mplishments! Sign in using Google or facebook to get started, no sign up needed!</span> 
            <div className="fade-button" onClick={this.toggleFade}>Sign in</div>
            <Fade className="fade" in={this.state.fadeIn}>
              <div className="button-div">
                <div className="google-button" onClick={this.login}> <img className="google-logo" src={google} alt="google logo" /> Google </div> 
                <div className="fb-button" onClick={this.facebookLogin}> <img className="facebook-logo" src={facebook} alt="facebook logo" /> Facebook </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Landing);
