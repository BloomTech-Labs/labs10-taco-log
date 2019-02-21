import React, { Component } from 'react';
import MapPage from './MapPage.js'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';


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
        )
    }
}

export default HomePage;