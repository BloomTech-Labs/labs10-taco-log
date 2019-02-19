import React, { Component } from 'react';
//import Map from './Components/map.js';

class HomePage extends Component {
    constructor(props) {
        super();
        this.state= {
            message: ''
        }
    }

    render() {
        return (
            <div className= 'home-page'>
            <header className="App-header">
                {/* <Map
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
                /> */}
                <p>Taco Log Home Page!</p>
                {this.state.message}

            </header>
                
            </div>
        )
    }
}

export default HomePage;