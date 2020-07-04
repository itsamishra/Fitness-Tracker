import React, { Component } from "react";
import WeightTrackerInsert from "./WeightTrackerInsert";
import WeightTrackerDisplay from "./WeightTrackerDisplay";

export class WeightTracker extends Component {
  state = {
    chartData: [],
  };

  // Realods data for chart
  reloadChartData = () => {
    this.props
      .getAllWeighInRecords()
      .then((res) => {
        let chartData = [];
        for (let i in res.data) {
          chartData.push({
            name: res.data[i]["date"],
            weightLb: res.data[i]["weight_lb"],
            weightGoalLb: this.props.weightGoal,
          });
        }
        this.setState({
          chartData: chartData,
        });
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
          reloadChartData={this.reloadChartData}
        />
        <br />
        <br />
        <WeightTrackerDisplay
          getAllWeighInRecords={this.props.getAllWeighInRecords}
          getWeighInData={this.props.getWeighInData}
          chartData={this.state.chartData}
          reloadChartData={this.reloadChartData}
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
