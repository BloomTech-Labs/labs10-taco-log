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
import { firebase } from "../firebase/firebase";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logout = this.logout.bind(this);
  }

  customlink = url => {
    this.props.locationChange();
    this.props.history.push(url);
  };

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

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand onClick={e => this.customlink("/landing/")}>
            Taco Home
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search Taco"
                  />
                </FormGroup>
              </Form>
              <NavItem>
                <NavLink onClick={e => this.customlink("/profile")}>
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={e => this.customlink("/home")}>
                  Taco Log
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
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
