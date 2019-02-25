
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { Link } from 'react-router-dom';


import {
  Form,
  Input,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle

} from 'reactstrap';
import { firebase, provider, facebookProvider } from '../firebase/firebase';
import axios from 'axios';
import taco from '../taco.jpg';
import './login-page.css';




class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      taco_location: "",
      taco_description: "",
      rating: ""
    };
    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
  }

  login() {
    
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid
        };
        this.props.loginUser(user);
        this.setState({
          user: true
        });
      });
  }

  facebookLogin () {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            const user = {
              name: result.user.displayName,
              email: result.user.email,
              ext_user_id: result.user.uid
            };
            this.props.loginUser(user);
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
    };
    let header = {};
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        header = {
          headers: {
            Authorization: idToken,
            id: this.state.userInfo.ext_user_id
          }
        };
        axios
          .post(`${url}api/tacos`, taco, header)
          .then(res => {
            console.log(res);
            this.setState({
              taco_location: '',
              taco_description: '',
              rating: ''
            });
            const stats = {
              tacos_logged: res.data.taco_logs.length
            };

            axios
              .put(
                `${url}api/user_stats/${res.data.internal_id}`,
                stats,
                header
              )
              .then(res => {
                if (res.data.stats[0].tacos_logged >= 5) {
                  const achievement = {
                    user_id: res.data.internal_id,
                    achievement_id: 2
                  };
                  axios
                    .post(`${url}api/user_achievements`, achievement, header)
                    .then(res => {
                      this.setState({
                        userInfo: res.data
                      });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
                this.setState({
                  userInfo: res.data
                });
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

  deleteTaco = id => {
    // event.preventDefault();
    console.log('delete');
    const user = {
      user_id: this.state.userInfo.internal_id
    };
    axios
      .delete(`${url}api/tacos/${id}`, { data: { user } })
      .then(res => {
        this.setState({
          userInfo: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    
    return (
      <div className="login-page">
        <div className="login-box">
          <Card className="card">
            <CardImg className="taco-image" src={taco} alt="taco image" />
            <CardBody className="card-body">
              <CardTitle className="login-text"> Continue With </CardTitle>
              
              
                <Button className="google-button" onClick={this.login}>
                  Google
                </Button>
              
                <Button className="fb-button" onClick={this.facebookLogin}>
                  Facebook
                </Button>
              
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

// export default LoginPage;

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
