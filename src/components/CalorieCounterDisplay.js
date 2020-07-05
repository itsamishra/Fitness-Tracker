import React, { Component } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export class CalorieCounterDisplay extends Component {
  componentDidMount() {
    this.props.reloadComposedChart();
  }

  render() {
    let composedChart = (
      <ResponsiveContainer
        width="100%"
        height={Math.min(400, 0.5 * window.screen.width)}
      >
        <ComposedChart
          data={this.props.composedChartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calorieCount" fill="#00D7FF" />
          <Line type="monotone" dataKey="calorieGoal" stroke="#FF2800" />
        </ComposedChart>
      </ResponsiveContainer>
    );

    return (
      <div>
        <h2 style={inputLabelStyle}>View Calories</h2>

        <p style={pTagStyle}>
          Daily Calorie Goal: {this.props.dailyCalorieGoal}
        </p>
        <p style={pTagStyle}>
          Today's Calorie Balance: {this.props.todaysCalorieBalance}
        </p>

        {composedChart}
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px solid black",
  borderCollapse: "collapse",
};

const trStyle = {
  border: "1px solid black",
  textAlign: "center",
};

const pTagStyle = {
  textAlign: "center",
};

export default CalorieCounterDisplay;
