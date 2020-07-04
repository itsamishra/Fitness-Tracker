import React, { Component } from "react";
import WeightTrackerInsert from "./WeightTrackerInsert";
import WeightTrackerDisplay from "./WeightTrackerDisplay";

export class WeightTracker extends Component {
  state = {
    chartData: [
      { name: "Jan 1", weight: 200 },
      { name: "Jan 2", weight: 190 },
      { name: "Jan 3", weight: 180 },
    ],
  };

  // Realods data for chart
  reloadChartData = () => {
    this.props
      .getAllWeighInRecords()
      .then((res) => {
        console.log("Date: ");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  };

  render() {
    return (
      <div>
        <WeightTrackerInsert
          addNewWeighIn={this.props.addNewWeighIn}
          getDateXDaysBeforeToday={this.props.getDateXDaysBeforeToday}
        />
        <br />
        <br />
        <WeightTrackerDisplay
          getAllWeighInRecords={this.props.getAllWeighInRecords}
          setWeighInDataState={this.props.setWeighInDataState}
          getWeighInData={this.props.getWeighInData}
          chartData={this.state.chartData}
          reloadChart={this.reloadChart}
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

export default WeightTracker;
