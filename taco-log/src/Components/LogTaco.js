import React, { Component } from "react";
import { firebase } from "../firebase/firebase";
import "../css/logTaco.css";

class LogTaco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taco_location: "",
      taco_name: "",
      rating: "",
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
      special_experience: 0,
      taco_description: ""
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
    const inputElement = document.querySelector(".dropdown");
    const dropdown = new window.google.maps.places.Autocomplete(inputElement);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
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

  achievementCheck = achievementId => {
    for (let i = 0; i < this.props.userInfo.achievements.length; i++) {
      if (this.props.userInfo.achievements[i].id === achievementId) {
        return true;
      }
    }
  };
  addAchievement = header => {
    if (
      this.props.userInfo.user_stats.tacos_logged >= 5 &&
      !this.achievementCheck(2)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 2
      };
      this.props.assignAchievement(achievement, header);
    }
  };

  updateStats = header => {
    const id = this.props.userInfo.internal_id;
    const stats = {
      tacos_logged: this.props.userInfo.taco_logs.length
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
      special_experience: this.state.special_experience
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
      special_experience: "0"
    });
  };

  toggleSpecialExp = () => {    
    if (this.state.special_experience === 0) {
      this.setState({
        special_experience: 1
      });
    } else {
      this.setState({
        special_experience:0
      });
    }
  };

  render() {    
    return (
      <div className="taco-form">
        <p>Log a Taco Here:</p>
        <input
          onChange={this.handleInputChange}
          class="dropdown"
          placeholder="location"
          value={this.state.taco_location}
          name="taco_location"
        />
        <div className="title-map-wrap">
          <div>{this.state.taco_location}</div>
          <div className="taco-map">
            {this.state.staticMap && (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                  this.state.lat
                },${
                  this.state.lng
                }&zoom=14&size=800x150&key=AIzaSyCgxie-2MKM8N9ibIvYVGzuzvVSaXDonrE&markers=${
                  this.state.lat
                },${this.state.lng}&scale=2`}
              />
            )}
          </div>
        </div>
        <div className="ingredent-tab-wrap">
          Tortilla:
          {this.state.tortilla.map(data => (
            <div
              onClick={this.selectTortilla}
              className={
                this.state.selectedTortilla.indexOf(data) > -1
                  ? "ingredent-tab ingredent-tab-selected"
                  : "ingredent-tab"
              }
              id={data}
            >
              {data}
            </div>
          ))}
        </div>
        <div className="ingredent-tab-wrap">
          Meat:
          {this.state.meat.map(data => (
            <div
              onClick={this.selectMeat}
              className={
                this.state.selectedMeat.indexOf(data) > -1
                  ? "ingredent-tab ingredent-tab-selected"
                  : "ingredent-tab"
              }
              id={data}
            >
              {data}
            </div>
          ))}
        </div>
        <div className="ingredent-tab-wrap">
          Cheese:
          {this.state.cheese.map(data => (
            <div
              onClick={this.selectCheese}
              className={
                this.state.selectedCheese.indexOf(data) > -1
                  ? "ingredent-tab ingredent-tab-selected"
                  : "ingredent-tab"
              }
              id={data}
            >
              {data}
            </div>
          ))}
        </div>
        <div className="ingredent-tab-wrap">
          Salsa:
          {this.state.salsa.map(data => (
            <div
              onClick={this.selectSalsa}
              className={
                this.state.selectedSalsa.indexOf(data) > -1
                  ? "ingredent-tab ingredent-tab-selected"
                  : "ingredent-tab"
              }
              id={data}
            >
              {data}
            </div>
          ))}
        </div>
        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="rating"
            value={this.state.rating}
            name="rating"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.taco_name}
            name="taco_name"
          />
          <button onClick={this.newTaco}>Submit</button>
        </form>
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
            value={this.state.taco_description}
            rows="10"
            cols="50"
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default LogTaco;
