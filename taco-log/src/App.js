import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



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
        {this.state.message}
        </header>
      </div>
    );
  }
}

export default App;
