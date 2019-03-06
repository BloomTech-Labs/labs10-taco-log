import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, Switch, Link } from "react-router-dom";
import { firebase } from "./firebase/firebase";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import LogTaco from "./Components/LogTaco";
import Landing from "./Components/Landing";
import AddStore from "./Components/AddStore";
import ProfilePage from "./Components/ProfilePage";
import AccountSettings from "./Components/AccountSettings";

import { loginUser, logTaco, deleteTaco, assignAchievement, locationChange, updateStats, GET_TACO, logoutUser, updateUser } from "./actions";

import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };

  }

  render() {
    
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <Header {...this.props} {...props}  />}
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
          path="/"
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
  { loginUser, logTaco, deleteTaco, assignAchievement, locationChange, updateStats, GET_TACO, logoutUser, updateUser }
)(App);
