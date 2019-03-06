import React, { Component } from "react";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { firebase, provider, facebookProvider } from '../firebase/firebase';
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import "../css/header.css"

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: null
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
  }

  customlink = url => {
    this.props.locationChange();
    this.props.history.push(url);
  };

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
        this.props.loginUser(user)
        this.setState({
          user
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
     this.props.loginUser(user);	

      this.setState({	
       user
     });	
   });	
}

  logout() {
    firebase.auth().signOut();
    this.props.logoutUser();
    this.props.locationChange();    
    this.props.history.push("/");
    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    console.log("user:", this.state.user)
    return (
      <div className="nav-container">
        <Navbar light expand="md">
          <NavbarBrand onClick={e => this.customlink("/landing/")}>
            Taco Log
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search Taco"
                  />
                </FormGroup>
              </Form> */}
              {this.state.user
                ? <div className="nav-div">
                    <NavLink onClick={e => this.customlink("/profile")}>
                      Profile
                    </NavLink>
                    <NavLink onClick={e => this.customlink("/home")}>
                      Taco Log
                    </NavLink> </div>
                : <div className="button-div">
                    <button className="google-button" onClick={this.login}> Google </button> 
                    <button className="fb-button" onClick={this.facebookLogin}> Facebook </button>
                  </div>
              }
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={e => this.customlink("/AccountSettings")}>
                    <NavLink>Settings</NavLink>
                  </DropdownItem>
                  <DropdownItem>About Us</DropdownItem>
                  <DropdownItem>
                    <StripeProvider apiKey="pk_test_wWgYjRm8woZFFe75so0wo6jp">
                      <Elements>
                        <CheckoutForm />
                      </Elements>
                    </StripeProvider>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Button onClick={this.logout}>Log Out</Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
