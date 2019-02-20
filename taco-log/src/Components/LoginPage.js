import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { firebase, provider } from '../firebase/firebase';
import axios from 'axios'

class LoginPage extends Component {
    constructor() {
        super();
        this.state= {
            user:null,
            userInfo: []
        }
        this.login = this.login.bind(this);
        //this.logout = this.logout.bind(this);
    }

    login() {
        firebase.auth().signInWithPopup(provider)
          .then((result)=> {
            const user = {
                name: result.user.displayName,
                email: result.user.email,
                ext_user_id: result.user.uid
            }
            console.log(result)
            axios    
                .post('http://localhost:5000/api/users', user)
                .then(res => {
                    this.setState({userInfo: res})
                })
                .catch(err => {
                    console.log(err);
                });
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