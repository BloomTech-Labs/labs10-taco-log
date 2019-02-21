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
const url = heroku

class LoginPage extends Component {
    constructor() {
        super();
        this.state= {
            user:null,
            userInfo: {},
            taco_location: "",
            taco_description: "",
            rating: ""
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
                .get(`${url}api/users`) 
                .then(res => {                    
                    let post = true
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].ext_user_id === user.ext_user_id){
                           axios.get(`${url}api/users/${res.data[i].internal_id}`)
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
                            .post(`${url}api/users`, user)
                            .then(res => {   
                                const stats = { user_id: res.data.internal_id}    
                                axios.post(`${url}api/user_stats`, stats)
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

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    newTaco = e => {
        e.preventDefault();
        const taco = {
            user_id: this.state.userInfo.internal_id,
            taco_location: this.state.taco_location,
            taco_description: this.state.taco_description,
            rating: this.state.rating
        }
        let header = {} 
        firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
            header = {
                headers: {
                    Authorization: idToken, 
                    id:this.state.userInfo.ext_user_id
                }
            }                  
            axios
                .post(`${url}api/tacos`, taco, header)
                .then(res => {  
                    console.log(res)                  
                    this.setState({
                    taco_location: "",
                    taco_description: "",
                    rating: ""
                    });
                    const stats = {
                        tacos_logged: res.data.taco_logs.length
                    }      
                              
                    axios
                        .put(`${url}api/user_stats/${res.data.internal_id}`, stats, header)
                        .then(res => {  
                            if (res.data.stats[0].tacos_logged >= 5){
                                const achievement = {
                                    user_id: res.data.internal_id,
                                    achievement_id: 2
                                }                            
                                axios
                                    .post(`${url}api/user_achievements`, achievement, header)
                                    .then(res => {
                                        this.setState({
                                            userInfo: res.data
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }                     
                            this.setState({
                                userInfo: res.data
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
        
        
    };

    render() {
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