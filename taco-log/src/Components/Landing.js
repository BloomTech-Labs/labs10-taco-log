import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import TacoList from "./TacoList";
import TacoCard from "./TacoCard";

class Landing extends Component {
    render() {
        return(
            <div>< TacoList {...this.props}/></div>
        )
    }
}

export default Landing;