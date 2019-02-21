import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, CardImg, CardBody,
    CardTitle, CardSubtitle  } from 'reactstrap';
import { firebase, provider } from '../firebase/firebase';
import axios from 'axios'
import taco from '../taco.jpg';
import './login-page.css';

const local = 'http://localhost:5000/'
const heroku = 'https://tacobe.herokuapp.com/'

class LoginPage extends Component {
    constructor() {
        super();
        this.state= {
            user:null,
            userInfo: {}
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
            axios
                .get(`${heroku}api/users`) 
                .then(res => {                    
                    let post = true
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].ext_user_id == user.ext_user_id){
                           axios.get(`${heroku}api/users/${res.data[i].internal_id}`)
                           .then(res =>{                                
                                this.setState({userInfo: res.data})
                           })
                           .catch(err => {
                                console.log(err);
                            });
                            post = false
                        }
                    }       
                    if(post){
                        axios    
                            .post(`${heroku}api/users`, user)
                            .then(res => {   
                                const stats = { user_id: res.data.internal_id}    
                                axios.post(`${heroku}api/user_stats`, stats)
                                .then(res => {
                                    this.setState({userInfo: res.data})
                                })  
                                .catch(err => {
                                    console.log(err);
                                });       
                                
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }                    
                })
                .catch(err => {
                    console.log(err);
                });
            
            this.setState({
              user: true
            });
          });
      }

    render() {console.log(this.state.userInfo)
        return (
            <div className= 'login-page'>
                <div className='login-box'>
                <Card className='card'>
                    <CardImg className='taco-image' src={taco} alt="taco image" />
                    <CardBody className='card-body'>
                        <CardTitle className="login-text"> Continue With </CardTitle>
                        {/* <Form>
                            <Input
                                placeholder= "Enter Email"
                                name= "email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <br />
                            <Input
                                placeholder= "Enter Password"
                                name= "password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form> */}
                        {/* <Button onClick= {this.emailLogin}>Login</Button>
                        <CardSubtitle>OR</CardSubtitle> */}
                        <Link to='/home'><Button className='google-button' onClick= {this.login}>Google</Button></Link>
                        <Link to='/home'><Button className='fb-button' onClick= {this.login}>Facebook</Button></Link>
                    </CardBody>
                </Card>
                </div>
            </div>
        )
    }
}

export default LoginPage; 