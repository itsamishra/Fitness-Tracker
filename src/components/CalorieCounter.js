import React, { Component } from "react";
import CalorieCounterInsert from "./CalorieCounterInsert";
import CalorieCounterDisplay from "./CalorieCounterDisplay";

export class CalorieCounter extends Component {
  state = {
    goBackDestination: this.props.displayLanding,
  };

  render() {
    return (
      <div>
        <CalorieCounterInsert
          addNewCalorieCount={this.props.addNewCalorieCount}
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
        />
        <br />
        <br />
        <CalorieCounterDisplay
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
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

export default CalorieCounter;
