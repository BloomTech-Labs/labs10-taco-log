import React, { Component } from "react";
import { firebase } from "../firebase/firebase";
import { Form, Input, Button, FormGroup, Container, Row, Col } from "reactstrap";
import tacoColor from "../img/taco-color.png"
import tacoGrey from "../img/taco-grey.png"
import "../css/logTaco.css";

class FirstTaco extends Component {
    constructor(props) {
        super(props);
    }

render() {
    return(
        <div>First Taco Component</div>
    )
}
}

export default FirstTaco;