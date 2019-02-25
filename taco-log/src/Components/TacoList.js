import React, { Component } from "react";
import TacoCard from "./TacoCard";

class TacoList extends Component {
  render() {
    return (
      <div className="taco-list-owrap">
        TACO LOG:
        {this.props.userInfo.taco_logs &&
        this.props.userInfo.taco_logs.length > 0 ? (
          <div>
            {this.props.userInfo.taco_logs.map(log => (
              <TacoCard
                {...this.props}
                key={log.id}
                id={log.id}
                taco_location={log.taco_location}
                taco_description={log.taco_description}
                rating={log.rating}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default TacoList;
