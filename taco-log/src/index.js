import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { firebase } from './firebase/firebase';
import { Provider } from 'react-redux';
import RootReducer from './reducers';
<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux';
import { logout, login } from './actions/auth';

=======
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
>>>>>>> 685a5a2b4e90bab40263f1660492c2bbb308be6c
import createHistory from 'history/createBrowserHistory';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));
const history = createHistory();
<<<<<<< HEAD
const jsx = (
=======


ReactDOM.render(
>>>>>>> 685a5a2b4e90bab40263f1660492c2bbb308be6c
  <Router history= {history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};
// ReactDOM.render(jsx, document.getElementById('root')
// );

// const hasRendered = false;
// const renderApp= () => {
//   if (hasRendered) {

//   }
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// tests if auth firebase function is being called
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //console.log('uId:', user.uid);
    store.dispatch(login(user.uid));
    renderApp();
    if(history.location.pathname ==='/') {
      history.push('/home');
    }
    console.log('logged in');
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/')
    console.log('logged out');
  }
});
