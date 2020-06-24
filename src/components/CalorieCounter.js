import React, { Component } from "react";
import CalorieCounterInsert from "./CalorieCounterInsert";
import CalorieCounterDisplay from "./CalorieCounterDisplay";

export class CalorieCounter extends Component {
  render() {
    return (
      <div>
        <CalorieCounterInsert />
        <CalorieCounterDisplay />
      </div>
    );
  }
}

export default CalorieCounter;
