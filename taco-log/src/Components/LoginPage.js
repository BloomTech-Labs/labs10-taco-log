import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { firebase, provider } from '../firebase/firebase';

class LoginPage extends Component {
    constructor() {
        super();
        this.state= {
            user:null
        }
        this.login = this.login.bind(this);
        //this.logout = this.logout.bind(this);
    }

    login() {
        firebase.auth().signInWithPopup(provider)
          .then((result)=> {
            const user = result.user;
            this.setState({
              user: true
            });
          });
      }

    render() {
        return (
            <div className= 'login-page'>
                <p>This is the login page</p>
                <Link to='/home'><Button onClick= {this.login}>Login</Button></Link>
            </div>
        )
    }
}

export default LoginPage; 