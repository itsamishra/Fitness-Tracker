import React, { Component } from "react";

export class Landing extends Component {
  calorieCounterButtonClickHandler = () => {
    this.props.displayCalorieCounter();
  };

  weightTrackerButtonClickHandler = () => {
    this.props.displayWeightTracker();
  };

  render() {
    return (
      <div>
        <button
          style={buttonStyle}
          onClick={this.calorieCounterButtonClickHandler}
        >
          Calorie Counter
        </button>
        <br />
        <br />
        <button style={buttonStyle}>Fitness Tracker</button>
        <br />
        <br />
        <button
          style={buttonStyle}
          onClick={this.weightTrackerButtonClickHandler}
        >
          Weight Tracker
        </button>
        <br />
        <br />
        <button style={buttonStyle}>Sleep and Wellness Tracker</button>
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

export default Landing;
