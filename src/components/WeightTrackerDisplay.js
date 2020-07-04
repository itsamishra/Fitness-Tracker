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
  componentDidMount() {
    this.props.reloadChartData();
  }

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

          <Line
            type="monotone"
            dataKey="weightLb"
            name="Weight (lb)"
            stroke="#9D38C7"
          />
          <Line
            type="monotone"
            dataKey="weightGoalLb"
            name="Weight Goal (lb)"
            stroke="#62C738"
          />
        </LineChart>
      </ResponsiveContainer>
    );

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
