import React, { Component } from "react";
import TacoCard from "./TacoCard";

class MyTacoList extends Component {
  render() {
    return (
      <div className="taco-list-owrap">
        TACO LOG:
        <button onClick={e => console.log(this.props)}>ee</button>{" "}
        {this.props.expTacos &&
        this.props.expTacos.length > 0 ? (
          <div>
            {this.props.expTacos.map(log => (
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

export default MyTacoList;
