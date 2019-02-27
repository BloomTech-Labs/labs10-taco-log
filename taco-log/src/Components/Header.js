
import React, { Component } from 'react';
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
  DropdownItem } from 'reactstrap';
  import { firebase } from "../firebase/firebase";


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: null
    };
    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.setState({
          user: null
        });
      });
      window.location.reload();
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Taco Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="search" name="search" id="search" placeholder="Search Taco" />
                </FormGroup>
              </Form>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/taco">Taco Log</NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem>
                    About Us
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
