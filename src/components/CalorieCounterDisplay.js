import React, { Component } from "react";

export class CalorieCounterDisplay extends Component {
  state = {};

  componentDidMount() {
    this.props.reloadTable();
  }

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>View Calories</h2>

        <table style={tableStyle}>
          <tr style={trStyle}>{this.props.tableHeaders}</tr>
          <tr style={trStyle}>{this.props.tableRow}</tr>
        </table>
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

export default CalorieCounterDisplay;
