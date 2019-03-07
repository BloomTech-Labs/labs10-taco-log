import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import tacoFiller from '../img/taco-filler.jpg';
import tacoFiller2 from '../img/taco-filler2.jpg';
import "../css/LandingPageFiller.css";

export default class LandingPageFiller extends React.Component {
  render() {
    return(
    <Container>
      <Row>
          <Col xs="6"><img className="taco-image" src={tacoFiller} /> </Col>
          <Col xs="6" className="taco-text"><h2>Simply put, tacos are delicious.</h2>
          <p>But how many tacos have you've eaten? What was your taco journey really like?</p>
          <p>With Taco Logs, you can start keeping track of your tacoventures in the world.</p>
          <p>Simply put in where you had it and what was in your taco, name it, and presto, you have a taco logged!</p>
          </Col>
      </Row>
      <Row>
          <Col xs="6" className="taco-text"><h2>About</h2>
          <p>This was a Lambda Labs project. </p>
          <p>We're still learning as we go on so if you'd like to take a look at our <a href='https://github.com/Lambda-School-Labs/labs10-taco-log'>Github repo</a> and give feedback or make your own from it, feel free! We appreciate any insight or help.</p>
          </Col>
          <Col xs="6"><img className="taco-image" src={tacoFiller2} /></Col>
      </Row>
    </Container>
    );
  }
}