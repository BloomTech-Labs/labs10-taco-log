import React, { Component } from "react";
import TacoCard from "./TacoCard";

class TacoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      cityfilter: "All",
      filteredLogs: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    console.log("here");
    let cities = [];
    for (let i = 0; i < this.props.userInfo.taco_logs.length; i++) {
      let city = this.props.userInfo.taco_logs[i].address.split(",")[1].trim();
      cities.push(city);
    }
    this.setState({
      cities: cities
    });
  };

  // componentDidUpdate(prevState) {
  //   if (
  //     prevState.cityfilter &&
  //     prevState.cityfilter !== this.state.cityfilter
  //   ) {
  //   }
  // }

  handleChange(e) {
    e.preventDefault();
    
    const filteredLogs = this.props.userInfo.taco_logs.filter(log => { 
      return log.address.split(",")[1].trim() === e.target.value;
    });
    this.setState({ filteredLogs: filteredLogs, cityfilter: e.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <select value={this.state.cityfilter} onChange={this.handleChange}>
            <option value="All">All</option>
            {this.state.cities.map(city => (
              <option value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="taco-list-owrap">
          TACO LOG:
          {this.state.cityfilter === "All" ? (
            <div>
              {this.props.userInfo.taco_logs.map(log => (
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
            <div>
              {this.state.filteredLogs.map(log => (
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
          )}
        </div>
      </div>
    );
  }
}

export default TacoList;
