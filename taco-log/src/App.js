import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Map from './Components/map.js';
import { firebase, provider } from './firebase/firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount(){
    axios
      .get('https://tacobe.herokuapp.com/')
      .then(res => {
        console.log(res)
        this.setState({message: res.data.message});
      })
      .catch(err=>{
        console.log(err);
      })
  }

  login() {
    firebase.auth().signInWithPopup(provider)
    //firebase.auth().signInWithPopup(provider)
      .then((result)=> {
        const user = result.user;
        this.setState({
          user: true
        });
        console.log(user)
      });
  }

  logout() {
    firebase.auth().signOut()
    .then((result)=> {
      this.setState({
        user: null
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        <p>Taco Log!</p>
          <Map
            id="myMap"
            options={{
              center: { lat: 41.0082, lng: 28.9784 },
              zoom: 8
            }}
            onMapLoad={map => {
              let marker = new window.google.maps.Marker({
                position: { lat: 41.0082, lng: 28.9784 },
                map: map,
                title: 'Testing map'
              });
            }}
          />
        {this.state.message}

          <p>Taco Log!</p>
          {this.state.message}

        </header>
        <button onClick= {this.login}>Login</button>
        <button onClick= {this.logout}>Log Out</button>
      </div>
    );
  }
}

export default App;
