import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { firebase } from './firebase/firebase';

ReactDOM.render(
    <Router>
        <App />
    </Router> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// tests if auth firebase function is being called
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in');
    } else {
        console.log('logged out');
    }
});