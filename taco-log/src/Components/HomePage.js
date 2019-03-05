import React, { Component } from "react";
import MapPage from "./MapPage.js";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import LogTaco from "./LogTaco";
import {Link} from "react-router-dom"
import Header from './Header';


class HomePage extends Component { 
  link = () => {
    this.props.locationChange()
    this.props.history.push('/profile')
  }

  

  render() {
    return (
      <div className="home-page">
        <header className="App-header">          
          <p>Taco Log Home Page!</p>          
          <LogTaco {...this.props} /> 
        </header>
      </div>
    );
  }
}


export default HomePage;
