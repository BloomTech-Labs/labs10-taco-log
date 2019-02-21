import React, { Component } from 'react';
import MapPage from './MapPage.js'


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
                <p>Taco Log Home Page!</p>
                {this.state.message}
                <MapPage />
            </header>
            </div>
        )
    }
}

export default HomePage;