import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Map from './Components/map.js';

class App extends Component {
  state = {
    message: ''
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
        </header>
      </div>
    );
  }
}

export default App;
