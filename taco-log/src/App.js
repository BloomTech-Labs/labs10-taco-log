import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, Switch, Link } from "react-router-dom";
import { firebase } from "./firebase/firebase";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import LogTaco from "./Components/LogTaco";
import LoginPage from "./Components/LoginPage";
import Landing from "./Components/Landing";
import AddStore from "./Components/AddStore";
import ProfilePage from "./Components/ProfilePage";
import AccountSettings from "./Components/AccountSettings";

import { loginUser, logTaco, deleteTaco, assignAchievement, locationChange, updateStats, GET_TACO, logoutUser } from "./actions";

import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      user: null
    };
    //this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
  }



  // achievementCheck = achievementId => {
  //   for (let i = 0; i < this.props.userInfo.achievements.length; i++) {
  //     if (this.props.userInfo.achievements[i].id === achievementId) {
  //       return true;
  //     }
  //   }
  // };
  // addAchievement = header => {
  //   if (
  //     this.props.userInfo.user_stats.tacos_logged >= 5 &&
  //     !this.achievementCheck(2)
  //   ) {
  //     const achievement = {
  //       user_id: this.props.userInfo.internal_id,
  //       achievement_id: 2
  //     };
  //     this.props.assignAchievement(achievement, header);
  //   }
  // };

  // updateStats = header => {
  //   const id = this.props.userInfo.internal_id
  //   const stats = {
  //     tacos_logged: this.props.userInfo.taco_logs.length
  //   };
  //   this.props.updateStats(id, stats, header)
  // }

  // componentDidUpdate(prevProps) {
  //   console.log(this.props.userInfo.taco_logs)
  //   console.log(prevProps.userInfo.taco_logs)
  //   // if (this.props.userInfo.taco_logs !== prevProps.userInfo.taco_logs){
  //   //   firebase
  //   //     .auth()
  //   //     .currentUser.getIdToken(true)
  //   //     .then(idToken => {
  //   //       const header = {
  //   //         headers: {
  //   //           Authorization: idToken,
  //   //           id: this.props.userInfo.ext_user_id
  //   //         }
  //   //       };
  //   //       this.updateStats(header);
  //   //     })
  //   //     .catch(err => {
  //   //       console.log(err);
  //   //     });
  //   // }
  //   if (prevProps.userInfo.user_stats !== this.props.userInfo.user_stats) {
  //     firebase
  //       .auth()
  //       .currentUser.getIdToken(true)
  //       .then(idToken => {
  //         const header = {
  //           headers: {
  //             Authorization: idToken,
  //             id: this.props.userInfo.ext_user_id
  //           }
  //         };
  //         this.addAchievement(header);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }

  // logout() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     this.props.locationChange()
  //     this.props.history.push('/')
  // }

  render() {console.log(this.props)
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <Header {...this.props} {...props}  />}
        />  
        <Route
          exact
          path="/"
          render={props => <LoginPage {...this.props} {...props} />}
        />  
        <Switch>      
        <Route
          exact
          path="/home"
          render={props => <HomePage {...this.props} {...props}  />}
        />
        <Route
          exact
          path="/tacos"
          render={props => <LogTaco {...this.props} {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={props => <ProfilePage {...this.props} {...props} />}
        />
        <Route
          exact
          path="/landing"
          render={props => <Landing {...this.props} {...props} />}
        />
        <Route
          exact
          path="/addstore"
          render={props => <AddStore {...this.props} {...props} />}
        />
          <Route
            exact
            path="/accountsettings"
            render={props => <AccountSettings {...this.props} {...props} />}
          />
        </Switch>
       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user,
    tacoInfo: state.tacoReducer.tacos
  };
};

export default connect(
  mapStateToProps,
  { loginUser, logTaco, deleteTaco, assignAchievement, locationChange, updateStats, GET_TACO, logoutUser }
)(App);
