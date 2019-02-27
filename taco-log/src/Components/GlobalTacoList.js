import React, { Component } from "react";
import TacoCard from "./TacoCard";

class GlobalTacoList extends Component {
  render() {
    return (
      <div className="taco-list-owrap">
        TACO LOG:
        {this.props.tacoInfo &&
        this.props.tacoInfo.length > 0 ? (
          <div>
            {this.props.tacoInfo.map(log => (
              <TacoCard
                {...this.props}
                key={log.id}
                id={log.id}
                taco_location={log.taco_location}
                taco_description={log.taco_description}
                rating={log.rating}
                tortilla={log.tortilla}
                meat={log.meat}
                cheese={log.cheese}
                salsa={log.salsa}
                created_at={log.created_at}
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

export default GlobalTacoList;
