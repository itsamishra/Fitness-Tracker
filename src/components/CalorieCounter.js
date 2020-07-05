import React, { Component } from "react";
import CalorieCounterInsert from "./CalorieCounterInsert";
import CalorieCounterDisplay from "./CalorieCounterDisplay";

export class CalorieCounter extends Component {
  state = {
    goBackDestination: this.props.displayLanding,
    composedChartData: [],
    todaysCalorieBalance: 0,
  };

  // Reloads chart with data
  reloadComposedChart = () => {
    this.props.setCalorieTotalForWeek().then(() => {
      let dailyCalorieGoal = this.props.dailyCalorieGoal;
      let weekCalorieTotal = this.props.getWeekCalorieTotal();

      let chartData = [];
      let todaysCalorieBalance = 0;
      for (let i in Object.keys(weekCalorieTotal)) {
        todaysCalorieBalance += dailyCalorieGoal;
        todaysCalorieBalance -= weekCalorieTotal[i]["totalCalories"];

        chartData.push({
          name: weekCalorieTotal[i]["date"],
          calorieCount: weekCalorieTotal[i]["totalCalories"],
          calorieGoal: dailyCalorieGoal,
        });
      }
      chartData.reverse();

      this.setState({
        composedChartData: chartData,
        todaysCalorieBalance: todaysCalorieBalance,
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
          reloadComposedChart={this.reloadComposedChart}
        />
        <br />
        <br />
        <CalorieCounterDisplay
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
          setCalorieTotalForWeek={this.props.setCalorieTotalForWeek}
          getWeekCalorieTotal={this.props.getWeekCalorieTotal}
          dailyCalorieGoal={this.props.dailyCalorieGoal}
          composedChartData={this.state.composedChartData}
          reloadComposedChart={this.reloadComposedChart}
          todaysCalorieBalance={this.state.todaysCalorieBalance}
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
