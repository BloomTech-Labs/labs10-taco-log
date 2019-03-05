import React, { Component } from 'react';
import { Nav, NavLink, NavItem } from 'reactstrap';
import "../css/Footer.css";

const Footer = (props) => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Footer;