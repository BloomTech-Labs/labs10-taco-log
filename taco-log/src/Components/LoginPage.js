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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null

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
              
                <Button className="fb-button" onClick={this.login}>
                  Facebook
                </Button>
              
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default LoginPage;
