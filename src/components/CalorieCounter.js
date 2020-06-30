import React, { Component } from "react";
import CalorieCounterInsert from "./CalorieCounterInsert";
import CalorieCounterDisplay from "./CalorieCounterDisplay";

export class CalorieCounter extends Component {
  state = {
    goBackDestination: this.props.displayLanding,
    firstRow: [],
    secondRow: [],
    thirdRow: [],
    todaysCalorieBudget: 0,
  };

  reloadTable = () => {
    // Creates rows for table below
    this.props.setCalorieTotalForWeek().then(() => {
      let dailyCalorieGoal = this.props.dailyCalorieGoal;
      let weekCalorieTotal = this.props.getWeekCalorieTotal();
      let todaysCalorieBudget = 0;

      // Creates rows of table
      let tableFirstRow = [];
      let tableSecondRow = [];
      let tableThirdRow = [];
      for (let i in Object.keys(weekCalorieTotal)) {
        tableFirstRow.push(<td style={thStyle}>{weekCalorieTotal[i].date}</td>);

        tableSecondRow.push(
          <td style={tdStyle}>{weekCalorieTotal[i].totalCalories}</td>
        );

        tableThirdRow.push(
          <td style={thStyle}>
            {dailyCalorieGoal - weekCalorieTotal[i].totalCalories}
          </td>
        );

        todaysCalorieBudget +=
          dailyCalorieGoal - weekCalorieTotal[i].totalCalories;
      }
      tableFirstRow.reverse();
      tableFirstRow.unshift(<td style={{ fontWeight: "bold" }}>Date</td>);
      tableSecondRow.reverse();
      tableSecondRow.unshift(<td style={{ fontWeight: "bold" }}>Calories</td>);
      tableThirdRow.reverse();
      tableThirdRow.unshift(<td style={{ fontWeight: "bold" }}>Balance</td>);

      // Updates state with new rows
      this.setState({
        firstRow: tableFirstRow,
        secondRow: tableSecondRow,
        thirdRow: tableThirdRow,
        todaysCalorieBudget: todaysCalorieBudget,
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
          tableHeaders={this.state.firstRow}
          secondRow={this.state.secondRow}
          thirdRow={this.state.thirdRow}
          dailyCalorieGoal={this.props.dailyCalorieGoal}
          todaysCalorieBudget={this.state.todaysCalorieBudget}
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
