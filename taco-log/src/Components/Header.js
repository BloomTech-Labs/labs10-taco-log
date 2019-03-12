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
import google from '../google.png';
import facebook from '../facebook.png';

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
        console.log(result)
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid,
          photoURL:result.user.photoURL
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
       ext_user_id: result.user.uid,
       photoURL:result.user.photoURL	
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
      <div className=
        {this.props.history.location.pathname ==='/'
          ? "nav-container-landing"
          : "nav-container"
        }>
        <Navbar light expand="md">
          <NavbarBrand onClick={e => this.customlink("/")}>
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
                <div className='navbar-buttons'> 
                    <NavLink onClick={e => this.customlink("/profile")}>
                    <Button className='nav-button'>
                      Profile
                      </Button>
                    </NavLink>
                    <NavLink onClick={e => this.customlink("/home")}>
                    <Button className='nav-button'>
                      Taco Log
                      </Button>
                    </NavLink>
                  <Button className='nav-button' onClick={this.logout}>Log Out</Button>
                  <Button className='nav-button'>
                  <StripeProvider apiKey="pk_test_wWgYjRm8woZFFe75so0wo6jp">
                    <Elements>
                      <CheckoutForm />
                    </Elements>
                  </StripeProvider>
                  </Button>
                  </div>
                     </div>
                : <div className="button-div">
                    <button className="google-button" onClick={this.login}> <img className="google-logo" src={google} alt="google logo" /> Google </button> 
                    <div className="fb-button" onClick={this.facebookLogin}> <img className="facebook-logo" src={facebook} alt="facebook logo" /> Facebook </div>
                  </div>
                  
              }
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={e => this.customlink("/AccountSettings")}>
                    <NavLink>Settings</NavLink>
                  </DropdownItem>
                  <DropdownItem>About Us</DropdownItem>
                  <DropdownItem>

                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
