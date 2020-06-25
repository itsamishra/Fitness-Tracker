import React, { Component } from "react";

export class CalorieCounterInsert extends Component {
  submitCalorieCount = () => {
    let calorieCount = document.getElementById("calorie-input").value;
    let date = document.getElementById("date-input").value;

    this.props.addNewCalorieCount(calorieCount, date);
  };

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>Insert Calories</h2>
        <h3 style={inputLabelStyle}>Calories</h3>
        <div style={inputDivStyle}>
          <input
            id="calorie-input"
            style={inputStyle}
            type="number"
            defaultValue="100"
          />
        </div>
        <br />
        <h3 style={inputLabelStyle}>Date</h3>
        <div style={inputDivStyle}>
          <input
            id="date-input"
            style={inputStyle}
            type="date"
            defaultValue={new Date().toISOString().substring(0, 10)} // Adds today as default value
          />
        </div>
        <br />
        <br />
        <button style={buttonStyle} onClick={this.submitCalorieCount}>
          Submit
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

const inputDivStyle = {
  textAlign: "center",
};

const inputStyle = {
  width: "25%",
  borderRadius: "25px",
  border: "5px solid #2F2FA2",
};

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default CalorieCounterInsert;
