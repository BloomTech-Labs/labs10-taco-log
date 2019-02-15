import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { firebase, auth, provider } from 'firebase';



class App extends Component {
  state = {
    message: '',
    user: null
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
    auth.signInWithPopup(provider)
      .then((result)=> {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Taco Log!</p>
          {this.state.message}
        </header>
        <button onClick= {this.login}>Login</button>
      </div>
    );
  }
}

export default App;
