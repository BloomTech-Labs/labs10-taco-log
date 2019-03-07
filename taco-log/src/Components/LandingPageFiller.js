import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import tacoFiller from '../img/taco-filler.jpg';
import "../css/LandingPageFiller.css";

export default class LandingPageFiller extends React.Component {
  render() {
    return(
    <Container>
      <Row>
          <Col xs="6"><img className="taco-image" src={ tacoFiller } /> </Col>
          <Col xs="6"><h1>Tacos are delicious.</h1>
          <p>But how many tacos have you've eaten? What was your taco journey really like?</p>
          <p>With Taco Logs, you can start keeping track of your tacoventures in the world.</p>
          <p>Simply put in where you had it and what was in your taco, name it, and presto, you have a taco logged!</p>
          </Col>
      </Row>
    </Container>
    );
  }
}