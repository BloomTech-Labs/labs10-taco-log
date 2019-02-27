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

  

  render() {console.log(this.props.userInfo)
    return (
      <div className="home-page">
        <header className="App-header">
          <div onClick = {this.link}>Profile</div>

          <p>Taco Log Home Page!</p>          
          <LogTaco {...this.props} />          
          {/* <MapPage /> */}

          <StripeProvider apiKey="pk_test_wWgYjRm8woZFFe75so0wo6jp">
            <div className="example">
              <h1>React Stripe</h1>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        </header>
      </div>
    );
  }
}


export default HomePage;
