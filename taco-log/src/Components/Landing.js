import React, { Component } from "react";
import { connect } from "react-redux";
import GlobalTacoList from "./GlobalTacoList";

class Landing extends Component {

    componentDidMount(){
        this.props.GET_TACO()
    }
    render() {
        return(
            <div>< GlobalTacoList {...this.props}/>
            <button onClick = {e => console.log(this.props)}>ee</button> </div>
        )
    }
}

export default connect()(Landing);