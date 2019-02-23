import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { firebase, provider } from "../firebase/firebase";
import taco from "../taco.jpg";
import "./login-page.css";

const local = "http://localhost:5000/";
const heroku = "https://tacobe.herokuapp.com/";
const url = local;

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
    //this.logout = this.logout.bind(this);
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newTaco = e => {
    e.preventDefault();
    const taco = {
      user_id: this.props.userInfo.internal_id,
      taco_location: this.state.taco_location,
      taco_description: this.state.taco_description,
      rating: this.state.rating
    };
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        const header = {
          headers: {
            Authorization: idToken,
            id: this.props.userInfo.ext_user_id
          }
        };
        this.props.logTaco(taco, header);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      taco_location: "",
      taco_description: "",
      rating: ""
    });
  };

  deleteTaco = id => {
    const user = {
      user_id: this.props.userInfo.internal_id
    };
    this.props.deleteTaco(id, user);
  };

  render() {
    console.log(this.props);
    return (
      <div className="login-page">
        <div className="login-box">
          <Card className="card">
            <CardImg className="taco-image" src={taco} alt="taco image" />
            <CardBody className="card-body">
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
              <Link to="/home">
                <Button className="google-button" onClick={this.login}>
                  Google
                </Button>
              </Link>
              <Link to="/home">
                <Button className="fb-button" onClick={this.login}>
                  Facebook
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginPage;
