import React, { Component } from "react";

export class CalorieCounterDisplay extends Component {
  componentDidMount() {
    console.log(this.props.getDateXDaysBeforeToday(6));
  }

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>View Calories</h2>
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default CalorieCounterDisplay;
