import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { firebase } from './firebase/firebase';
import { Provider } from 'react-redux';
import RootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
const history = createHistory();


ReactDOM.render(
  <Router history= {history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// tests if auth firebase function is being called
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log('uId:', user.uid);
    if(history.location.pathname ==='/') {
      history.push('/home');
    }
    console.log('logged in');
  } else {
    history.push('/')
    console.log('logged out');
  }
});
