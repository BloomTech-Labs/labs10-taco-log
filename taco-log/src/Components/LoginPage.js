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

const local = 'http://localhost:5000/';
const heroku = 'https://tacobe.herokuapp.com/';
const url = heroku;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userInfo: {},
      taco_location: '',
      taco_description: '',
      rating: ''
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
        
        axios
          .get(`${url}api/users`)
          .then(res => {
            let post = true;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].ext_user_id === user.ext_user_id) {
                axios
                  .get(`${url}api/users/${res.data[i].internal_id}`)
                  .then(res => {
                    this.setState({ userInfo: res.data });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                post = false;
              }
            }
            if (post) {
              axios
                .post(`${url}api/users`, user)
                .then(res => {
                  const stats = { user_id: res.data.internal_id };
                  axios
                    .post(`${url}api/user_stats`, stats)
                    .then(res => {
                      this.setState({ userInfo: res.data });
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

  facebookLogin () {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(result => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid
        };
        
        axios
          .get(`${url}api/users`)
          .then(res => {
            let post = true;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].ext_user_id === user.ext_user_id) {
                axios
                  .get(`${url}api/users/${res.data[i].internal_id}`)
                  .then(res => {
                    this.setState({ userInfo: res.data });
                  })
                  .catch(err => {
                    console.log(err);
                  });
                post = false;
              }
            }
            if (post) {
              axios
                .post(`${url}api/users`, user)
                .then(res => {
                  const stats = { user_id: res.data.internal_id };
                  axios
                    .post(`${url}api/user_stats`, stats)
                    .then(res => {
                      this.setState({ userInfo: res.data });
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
    console.log(this.state.userInfo);
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
        <p>This is the login page</p>
        
        <div>
          TACO LOG:
          {this.state.userInfo.taco_logs &&
          this.state.userInfo.taco_logs.length > 0 ? (
            <div>
              {this.state.userInfo.taco_logs.map(log => (
                <div key={log.id}>
                  <p>{log.taco_location}</p>
                  <p>{log.taco_description}</p>
                  <p>{log.rating}</p>
                  <button onClick={() => this.deleteTaco(log.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>

        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="location"
            value={this.state.taco_location}
            name="taco_location"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="rating"
            value={this.state.rating}
            name="rating"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="description"
            value={this.state.taco_description}
            name="taco_description"
          />
          <button onClick={this.newTaco}>Submit</button>
        </form>
        {this.state.userInfo.achievements &&
        this.state.userInfo.achievements.length > 0 ? (
          <div>
            <p>Achievement:{this.state.userInfo.achievements[0].title}</p>
            <p>Description:{this.state.userInfo.achievements[0].description}</p>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

// export default LoginPage;

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);