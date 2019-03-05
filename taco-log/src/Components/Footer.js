import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import "../css/Footer.css";

const Footer = (props) => {
  return (
    <div>
      <Breadcrumb>
      <BreadcrumbItem active>About</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default Footer;