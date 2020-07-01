import React, { Component } from "react";
import Chart from "chart.js";

export class WeightTrackerDisplay extends Component {
  refreshGraph = () => {
    this.props
      .getAllWeighInRecords()
      .then((records) => {
        return this.props.setWeighInDataState(records.data);
      })
      .then(() => {
        let weighInData = this.props.getWeighInData();

        // Creates options object for graph
        let options = {
          type: "line",
          data: {
            labels: weighInData.weightLabels,
            datasets: [
              {
                label: "Weight",
                data: weighInData.weightLbData,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    reverse: false,
                  },
                },
              ],
            },
          },
        };

        // Creates graph with above data
        let ctx = document.getElementById("chartJSContainer").getContext("2d");
        new Chart(ctx, options);
      });
  };

  componentDidMount() {
    this.refreshGraph();
  }

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>View Weigh Ins</h2>

        <canvas id="chartJSContainer"></canvas>
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default WeightTrackerDisplay;
