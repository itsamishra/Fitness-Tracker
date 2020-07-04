import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export class WeightTrackerDisplay extends Component {
  render() {
    // Linechart to be inserted in display
    const lineChart = (
      <ResponsiveContainer
        width="100%"
        height={Math.min(400, 0.5 * window.screen.width)}
      >
        <LineChart
          data={this.props.chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="weight" name="Weight" />
        </LineChart>
      </ResponsiveContainer>
    );

    console.log(this.props.chartData);
    return (
      <div>
        <h2 style={inputLabelStyle}>View Weigh Ins</h2>
        {lineChart}
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default WeightTrackerDisplay;
