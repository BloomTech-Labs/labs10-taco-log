import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import GlobalTacoList from "./GlobalTacoList";
import TacoCard from "./TacoCard";

class Landing extends Component {
    render() {
        return(
            <div>< GlobalTacoList {...this.props}/></div>
        )
    }
}

export default Landing;