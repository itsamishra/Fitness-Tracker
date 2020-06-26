import React, { Component } from "react";

export class CalorieCounterDisplay extends Component {
  state = {
    tableHeaders: [],
    tableRow: [],
  };

  componentDidMount() {
    this.props.setCalorieTotalForWeek().then(() => {
      // console.log(this.props.getWeekCalorieTotal());
      let weekCalorieTotal = this.props.getWeekCalorieTotal();

      let tableHeaders = [];
      for (let i in Object.keys(weekCalorieTotal)) {
        tableHeaders.push(<th>{weekCalorieTotal[i].date}</th>);
      }
      tableHeaders.reverse();

      let tableRow = [];
      for (let i in Object.keys(weekCalorieTotal)) {
        tableRow.push(<td>{weekCalorieTotal[i].totalCalories}</td>);
      }
      tableRow.reverse();

      this.setState({
        tableHeaders: tableHeaders,
        tableRow: tableRow,
      });
    });
  }

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>View Calories</h2>
        <table>
          <tr>{this.state.tableHeaders}</tr>
          <tr>{this.state.tableRow}</tr>
        </table>
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default CalorieCounterDisplay;
