import React, { Component } from "react";
import WeightTrackerInsert from "./WeightTrackerInsert";
import WeightTrackerDisplay from "./WeightTrackerDisplay";

export class WeightTracker extends Component {
  render() {
    return (
      <div>
        <WeightTrackerInsert
          addNewWeighIn={this.props.addNewWeighIn}
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
        />
        <br />
        <br />
        <WeightTrackerDisplay />
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

export default WeightTracker;
