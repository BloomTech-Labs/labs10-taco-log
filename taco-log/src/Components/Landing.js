import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, FormGroup, Input, Button } from 'reactstrap';
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
      taco_location:"",
      fadeIn: false,
      place: {}
    };
    this.toggleFade = this.toggleFade.bind(this);
    this.searchTaco = this.searchTaco.bind(this);
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

handleInputChange = e => {
  this.setState({ [e.target.name]: e.target.value });
};

searchTaco () {
  if(this.props.user===null) {
    console.log("this is working")
    return (
      <alert>
        Sign in to continue, no sign up required!
      </alert>
      
    )
    
  }
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

    const inputElement = document.querySelector(".input");
    const dropdown = new window.google.maps.places.Autocomplete(inputElement);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
      console.log(place)
      this.setState({
        address: place.formatted_address,
        taco_location: place.name,
        place_id: place.id,
        staticMap: true,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  }
  render() {
    console.log("props:", this.props);
    return (
      <div className="landing-container">
        <div className="img-container">
          <div className="img-intro">
            <h1>Welcome to Taco Logs</h1>
            <h4>Home of the Taco Enthusiast!</h4>
            <div className="form">
              <FormGroup className="form-group-landing">
                <input
                  onChange={this.handleInputChange}
                  className="input"
                  type="search"
                  value={this.state.taco_location}
                  name="taco_location"
                  id="search"
                  placeholder="Find Taco"
                />
                <button className="button" onClick={this.searchTaco}> Search </button>
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
