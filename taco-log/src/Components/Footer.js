import React, { Component } from 'react';
import { Nav, NavLink, NavItem } from 'reactstrap';
import "../css/Footer.css";

const Footer = (props) => {
  return (
    <div classname='footer'>
      <Nav classname='footer-nav'>
        <NavItem>
          <NavLink href="https://github.com/Lambda-School-Labs/labs10-taco-log">Github</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Footer;