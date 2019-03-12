import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import GlobalTacoList from "./GlobalTacoList";
import LandingPageFiller from "./LandingPageFiller";
// import landingPageCover from "../img/landingpagecover.jpg";
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
      <div className="landing-container">
        <div className="img-container">
          <div className="img-intro">
            <h1>Welcome to Taco Logs</h1>
            <h4>Home of the Taco Enthusiast!</h4>
            <div className="form">
              <FormGroup className="form-group-landing">
                <input
                  className="input"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Find Taco"
                />
                <button className="button"> Search </button>
              </FormGroup>
              <h4>Find a taco to log!</h4>
              
            </div>
            
          </div>
        </div>
        
        <div className="mid-section">
          <GlobalTacoList {...this.props} />
          <LandingPageFiller />
        </div>
      </div>
    );
  }
}

export default connect()(Landing);
