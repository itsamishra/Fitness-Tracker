import React, { Component } from "react";
import CalorieCounterInsert from "./CalorieCounterInsert";
import CalorieCounterDisplay from "./CalorieCounterDisplay";

export class CalorieCounter extends Component {
  state = {
    goBackDestination: this.props.displayLanding,
    tableHeaders: [],
    tableRow: [],
  };

  reloadTable = () => {
    // Creates rows for table below
    this.props.setCalorieTotalForWeek().then(() => {
      console.log("Reloading...");
      let weekCalorieTotal = this.props.getWeekCalorieTotal();

      let tableFirstRow = [];
      for (let i in Object.keys(weekCalorieTotal)) {
        tableFirstRow.push(<td style={thStyle}>{weekCalorieTotal[i].date}</td>);
      }
      tableFirstRow.reverse();
      tableFirstRow.unshift(<td style={{ fontWeight: "bold" }}>Date</td>);

      let tableSecondRow = [];
      for (let i in Object.keys(weekCalorieTotal)) {
        tableSecondRow.push(
          <td style={tdStyle}>{weekCalorieTotal[i].totalCalories}</td>
        );
      }
      tableSecondRow.reverse();
      tableSecondRow.unshift(
        <td style={{ fontWeight: "bold" }}>Calories Consumed</td>
      );

      this.setState({
        tableHeaders: tableFirstRow,
        tableRow: tableSecondRow,
      });
    });
  };

  render() {
    return (
      <div>
        <CalorieCounterInsert
          addNewCalorieCount={this.props.addNewCalorieCount}
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
          reloadTable={this.reloadTable}
        />
        <br />
        <br />
        <CalorieCounterDisplay
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
          setCalorieTotalForWeek={this.props.setCalorieTotalForWeek}
          getWeekCalorieTotal={this.props.getWeekCalorieTotal}
          reloadTable={this.reloadTable}
          tableHeaders={this.state.tableHeaders}
          tableRow={this.state.tableRow}
        />
        <br />
        <br />
        <button style={buttonStyle} onClick={this.props.displayLanding}>
          Back
        </button>
      </div>
    );
  }
}

const buttonStyle = {
  color: "black",
  backgroundColor: "#59aed9",
  fontSize: "25px",
  border: "5px solid #2F2FA2",
  padding: "15px 25px",
  borderRadius: "25px",
  fontWeight: "bold",
  display: "block",
  margin: "auto",
};

const thStyle = {
  border: "1px solid black",
};

const tdStyle = {
  border: "1px solid black",
};

export default CalorieCounter;
