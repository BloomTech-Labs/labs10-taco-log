import React, { Component } from "react";
import { firebase } from "../firebase/firebase";
import { Form, Input, Button, FormGroup, Container, Row, Col } from "reactstrap";
import tacoColor from "../img/taco-color.png"
import tacoGrey from "../img/taco-grey.png"

import meatColor from "../img/achievement-4-color.png"
import meatGrey from "../img/achievement-4-grey.png"
import tortillaColor from "../img/tortillas (1).png"
import tortillaGrey from "../img/tortillas (1).png"
import cheeseColor from "../img/achievement-5-color.png"
import cheeseGrey from "../img/achievement-5-grey.png"
import salsaColor from "../img/achievement-6-color.png"
import salsaGrey from "../img/achievement-6-grey.png"





import FirstTaco from "./FirstTaco"
import "../css/logTaco.css";

class LogTaco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taco_location: "",
      taco_name: "",
      rating: null,
      place_id: "",
      tortilla: ["Corn", "Flour", "Other"],
      meat: ["Al Pastor", "Chicken", "Fish", "Steak", "Choriso"],
      cheese: ["Manchego", "Fontina", "Swiss", "Mozzarella", "Feta"],
      salsa: [
        "Pico",
        "Verde",
        "Chipotle Lime",
        "Easy Roja",
        "Creamy Avocado",
        "Tomato Salsa"
      ],
      selectedTortilla: [],
      selectedMeat: [],
      selectedCheese: [],
      selectedSalsa: [],
      selectedTab: 0,
      special_experience: 0,
      taco_description: "",
      tacos_logged: 0,
      photo: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectTortilla = e => {
    const selectedTortilla = this.state.selectedTortilla;
    if (selectedTortilla.indexOf(e.target.id) > -1) {
      for (let i = selectedTortilla.length - 1; i >= 0; i--) {
        if (selectedTortilla[i] === e.target.id) {
          selectedTortilla.splice(i, 1);
        }
      }
    } else {
      selectedTortilla.push(e.target.id);
    }

    this.setState({ selectedTortilla: selectedTortilla });
  };
  selectMeat = e => {
    const selectedMeat = this.state.selectedMeat;
    if (selectedMeat.indexOf(e.target.id) > -1) {
      for (let i = selectedMeat.length - 1; i >= 0; i--) {
        if (selectedMeat[i] === e.target.id) {
          selectedMeat.splice(i, 1);
        }
      }
    } else {
      selectedMeat.push(e.target.id);
    }

    this.setState({ selectedMeat: selectedMeat });
  };
  selectCheese = e => {
    const selectedCheese = this.state.selectedCheese;
    if (selectedCheese.indexOf(e.target.id) > -1) {
      for (let i = selectedCheese.length - 1; i >= 0; i--) {
        if (selectedCheese[i] === e.target.id) {
          selectedCheese.splice(i, 1);
        }
      }
    } else {
      selectedCheese.push(e.target.id);
    }

    this.setState({ selectedCheese: selectedCheese });
  };
  selectSalsa = e => {
    const selectedSalsa = this.state.selectedSalsa;
    if (selectedSalsa.indexOf(e.target.id) > -1) {
      for (let i = selectedSalsa.length - 1; i >= 0; i--) {
        if (selectedSalsa[i] === e.target.id) {
          selectedSalsa.splice(i, 1);
        }
      }
    } else {
      selectedSalsa.push(e.target.id);
    }

    this.setState({ selectedSalsa: selectedSalsa });
  };

  componentDidMount() {
    const inputElement = document.querySelector(".google-dropdown");
    const dropdown = new window.google.maps.places.Autocomplete(inputElement);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
      console.log(place);
      this.setState({
        address: place.formatted_address,
        taco_location: place.name,
        place_id: place.id,
        staticMap: true,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        photo: place.photos[0].getUrl()
      });
    });
  }

  achievementCheck = achievementId => {
    let check = false;
    for (let i = 0; i < this.props.userInfo.achievements.length; i++) {
      if (this.props.userInfo.achievements[i].id === achievementId) {
        check = true;
      }
    }
    return check;
  };
  addAchievement = header => {
    if (
      this.props.userInfo.user_stats.tacos_logged >= 5 &&
      !this.achievementCheck(1)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 1
      };
      this.props.assignAchievement(achievement, header);
    }
    if (
      this.props.userInfo.user_stats.tacos_logged >= 10 &&
      !this.achievementCheck(2)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 2
      };
      this.props.assignAchievement(achievement, header);
    }
    if (
      this.props.userInfo.user_stats.tacos_logged >= 20 &&
      !this.achievementCheck(3)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 3
      };
      this.props.assignAchievement(achievement, header);
    }
    if (
      this.props.userInfo.user_stats.meats_logged.split(",").length === 5 &&
      !this.achievementCheck(4)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 4
      };
      this.props.assignAchievement(achievement, header);
    }

    if (
      this.props.userInfo.user_stats.cheese_logged.split(",").length === 5 &&
      !this.achievementCheck(5)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 5
      };
      this.props.assignAchievement(achievement, header);
    }

    if (
      this.props.userInfo.user_stats.salsa_logged.split(",").length === 6 &&
      !this.achievementCheck(6)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 6
      };
      this.props.assignAchievement(achievement, header);
    }
  };

  updateStats = header => {
    const id = this.props.userInfo.internal_id;

    let lastMeat = this.props.userInfo.taco_logs[
      this.props.userInfo.taco_logs.length - 1
    ].meat;

    if (lastMeat.length > 0) {
      lastMeat = lastMeat.split(",");
    }

    let currMeat = this.props.userInfo.user_stats.meats_logged;

    if (currMeat != null) {
      let currMeatArr = currMeat.split(",");
      if (lastMeat.length > 0) {
        for (let i = 0; i < lastMeat.length; i++) {
          if (currMeatArr.indexOf(lastMeat[i]) === -1) {
            currMeatArr.push(lastMeat[i]);
            currMeat = currMeatArr.join();
          }
        }
      }
    } else {
      if (lastMeat.length > 0) {
        currMeat = lastMeat.join();
      }
    }

    let lastCheese = this.props.userInfo.taco_logs[
      this.props.userInfo.taco_logs.length - 1
    ].cheese;

    if (lastCheese.length > 0) {
      lastCheese = lastCheese.split(",");
    }

    let currCheese = this.props.userInfo.user_stats.cheese_logged;

    if (currCheese != null) {
      let currCheeseArr = currCheese.split(",");
      if (lastCheese.length > 0) {
        for (let i = 0; i < lastCheese.length; i++) {
          if (currCheeseArr.indexOf(lastCheese[i]) === -1) {
            currCheeseArr.push(lastCheese[i]);
            currCheese = currCheeseArr.join();
          }
        }
      }
    } else {
      if (lastCheese.length > 0) {
        currCheese = lastCheese.join();
      }
    }

    let lastSalsa = this.props.userInfo.taco_logs[
      this.props.userInfo.taco_logs.length - 1
    ].salsa;

    if (lastSalsa.length > 0) {
      lastSalsa = lastSalsa.split(",");
    }

    let currSalsa = this.props.userInfo.user_stats.salsa_logged;

    if (currSalsa != null) {
      let currSalsaArr = currSalsa.split(",");
      if (lastSalsa.length > 0) {
        for (let i = 0; i < lastSalsa.length; i++) {
          if (currSalsaArr.indexOf(lastSalsa[i]) === -1) {
            currSalsaArr.push(lastSalsa[i]);
            currSalsa = currSalsaArr.join();
          }
        }
      }
    } else {
      if (lastSalsa.length > 0) {
        currSalsa = lastSalsa.join();
      }
    }

    const stats = {
      tacos_logged: this.props.userInfo.taco_logs.length,
      meats_logged: currMeat,
      cheese_logged: currCheese,
      salsa_logged: currSalsa
    };
    this.props.updateStats(id, stats, header);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.userInfo.taco_logs &&
      prevProps.userInfo.taco_logs &&
      this.props.userInfo.taco_logs.length !==
        prevProps.userInfo.taco_logs.length
    ) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          const header = {
            headers: {
              Authorization: idToken,
              id: this.props.userInfo.ext_user_id
            }
          };
          this.updateStats(header);
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (this.props.userInfo.user_stats !== prevProps.userInfo.user_stats) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          const header = {
            headers: {
              Authorization: idToken,
              id: this.props.userInfo.ext_user_id
            }
          };
          this.addAchievement(header);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  newTaco = e => {
    e.preventDefault();

    const selectedTortilla = this.state.selectedTortilla;
    const tortilla = selectedTortilla.toString();

    const selectedMeat = this.state.selectedMeat;
    const meat = selectedMeat.toString();

    const selectedCheese = this.state.selectedCheese;
    const cheese = selectedCheese.toString();

    const selectedSalsa = this.state.selectedSalsa;
    const salsa = selectedSalsa.toString();

    const taco = {
      user_id: this.props.userInfo.internal_id,
      taco_location: this.state.taco_location,
      taco_description: this.state.taco_description,
      taco_name: this.state.taco_name,
      rating: this.state.rating,
      address: this.state.address,
      location_id: this.state.place_id,
      tortilla: tortilla,
      meat: meat,
      cheese: cheese,
      salsa: salsa,
      special_experience: this.state.special_experience,
      photo: this.state.photo
    };
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        const header = {
          headers: {
            Authorization: idToken,
            id: this.props.userInfo.ext_user_id
          }
        };
        this.props.logTaco(taco, header);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      taco_location: "",
      taco_name: "",
      rating: "",
      taco_description: "",
      special_experience: "0",
      selectedTortilla: [],
      selectedMeat: [],
      selectedCheese: [],
      selectedSalsa: []
    });
  };

  toggleSpecialExp = () => {
    if (this.state.special_experience === 0) {
      this.setState({
        special_experience: 1
      });
    } else {
      this.setState({
        special_experience: 0
      });
    }
  };

  toggleRating = e => {
    if (this.state.rating === e.target.id) {
      this.setState({ rating: "0" });
    } else {
      this.setState({
        rating: e.target.id
      });
    }
  };

  toggleIngredientTab = e => {
    if (this.state.selectedTab !== e.target.id) {
      this.setState({ selectedTab: e.target.id });
    } else {
      this.setState({
        selectedTab: "0"
      });
    }
  };
  // grabTacosLogged = e => {
  //   if (this.state.userInfo) {
  //   this.setState({tacos_logged: this.props.userInfo.user_stats.tacos_logged})
  //   }
  // }

  // mapPlacetoState = e => {
  //   this.setState({
  //     address: this.props.place.formatted_address,
  //     taco_location: this.props.place.name,
  //     place_id: this.props.place.id,
  //     staticMap: true,
  //     lat: this.props.place.geometry.location.lat(),
  //     lng: this.props.place.geometry.location.lng()
  //   })
  // }

  render() {
    return (
      <Container className="log-taco-container">
        {/* {this.props.userInfo ? this.grabTacosLogged() : console.log("No user")} */}
        <div className="taco-form">
          <Container className="search-map-container quadrant">
            {this.props.place ? (
              <p>
                {this.mapPlacetoState()} {this.state.place.taco_location}
              </p>
            ) : (
              <Row className="search-bar">
                <input
                  onChange={this.handleInputChange}
                  className="google-dropdown"
                  placeholder="Look up where you had your taco here so you can get started!"
                  value={this.state.taco_location}
                  name="taco_location"
                />
              </Row>
            )}
            {/*         <div className="title-map-wrap">
          <div className="taco-map">
            {this.state.staticMap && (
              <img className="taco-map-box"
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                  this.state.lat
                },${
                  this.state.lng

                }&zoom=14&size=300x100&key=AIzaSyCgxie-2MKM8N9ibIvYVGzuzvVSaXDonrE&markers=${

                  this.state.lat
                },${this.state.lng}&scale=2`}
              />
            )}
          </div>
        </div> */}
          <Row>
              {this.state.place_id ? 
              <div className="location-information">
                <div className="location-image-wrap"><img className='location-photo' src={`${this.state.photo}`}/></div>
                <p>{this.state.address}</p>
              </div> : <div/>}
              </Row>
          </Container>
          <Input
            className="name-container quadrant"
            onChange={this.handleInputChange}
            placeholder="What was the name of the taco you had here? Or you can put in whatever you want to call it if it was something custom to you!"
            value={this.state.taco_name}
            name="taco_name"
          />
      <Container className="ingredient-container quadrant">
        <Row className="ingredient-tab-wrap">
        <img src={(this.state.selectedTab === "1")?tortillaColor:tortillaGrey} onClick={e => this.toggleIngredientTab(e)} id="1" />
          {this.state.selectedTab === "1" ? this.state.tortilla.map(data => (
            <Col 
              onClick={this.selectTortilla}
              className={
                this.state.selectedTortilla.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )) : <p>Test: tortilla unselected</p> }
        </Row>

        <Row className="ingredient-tab-wrap">

        <img src={(this.state.selectedTab === "2")?meatColor:meatGrey} onClick={e => this.toggleIngredientTab(e)} id="2" />
          {this.state.selectedTab === "2" ? this.state.meat.map(data => (
            <Col 
              onClick={this.selectMeat}
              className={
                this.state.selectedMeat.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )): <p> Test: meats unselcted </p>}
        </Row>
        <Row className="ingredient-tab-wrap">

        <img src={(this.state.selectedTab === "3")?cheeseColor:cheeseGrey} onClick={e => this.toggleIngredientTab(e)} id="3" />
          {this.state.selectedTab === "3" ? this.state.cheese.map(data => (
            <Col 
              onClick={this.selectCheese}
              id="cheese"
              className={
                this.state.selectedCheese.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )) : <p>Test: cheese unselected</p>}
        </Row>

        <Row className="ingredient-tab-wrap">
        <img src={(this.state.selectedTab === "4") ? salsaColor:salsaGrey} onClick={e => this.toggleIngredientTab(e)} id="4" />
          {this.state.selectedTab === "4" ? this.state.salsa.map(data => (
            <Col 
              onClick={this.selectSalsa}
              className={
                this.state.selectedSalsa.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )): <p>Test: salsa unselected</p>}
        </Row>
        </Container>
        <Container className="special-experience-container quadrant">
        <Form>
        <FormGroup className="rating-icons">
          <img src={(this.state.rating >= 1)?tacoColor:tacoGrey} onClick={(e) => this.toggleRating(e)} className='taco-icon' id="1" alt = "taco-icon"/>
          <img src={(this.state.rating >= 2)?tacoColor:tacoGrey} onClick={(e) => this.toggleRating(e)} className='taco-icon' id="2" alt = "taco-icon"/>
          <img src={(this.state.rating >= 3)?tacoColor:tacoGrey} onClick={(e) => this.toggleRating(e)} className='taco-icon' id="3" alt = "taco-icon"/>
          <img src={(this.state.rating >= 4)?tacoColor:tacoGrey} onClick={(e) => this.toggleRating(e)} className='taco-icon' id="4" alt = "taco-icon"/>
          <img src={(this.state.rating >= 5)?tacoColor:tacoGrey} onClick={(e) => this.toggleRating(e)} className='taco-icon' id="5" alt = "taco-icon"/>
              <Button onClick={this.newTaco}>Submit</Button>
            </FormGroup>
          </Form>
        <div>
          <input
            onClick={this.toggleSpecialExp}
            type="checkbox"
            name="special_experience"
            value=""
          />
          Special Experience?
        </div>

        {this.state.special_experience === 1 ? (
          <textarea
            onChange={this.handleInputChange}
            name="taco_description"
            placeholder="Did you have a great taco experience in this restaurant? Write about it here!"
            value={this.state.taco_description}
            rows="10"
            cols="50"
          />
        ) : (
          <div />
        )}
        </Container>
        </div>
      </Container>
    );
  }
}

export default LogTaco;
