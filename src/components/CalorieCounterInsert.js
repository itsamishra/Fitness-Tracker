import React, { Component } from "react";

export class CalorieCounterInsert extends Component {
  state = {
    insertCaloriesMessage: "",
    insertCaloriesMessageColor: "",
  };

  // Submits calorie count entered by user
  submitCalorieCount = () => {
    // Removes message
    this.setState({
      insertCaloriesMessage: "",
      insertCaloriesMessageColor: "",
    });

    // Extracts parameters
    let calorieCount = document.getElementById("calorie-input").value;
    let date = document.getElementById("date-input").value;

    // Attempts to insert record
    this.props.addNewCalorieCount(calorieCount, date).then((res) => {
      if (res.data === true) {
        this.setState({
          insertCaloriesMessage: "Record successfully inserted!",
          insertCaloriesMessageColor: "green",
        });
        document.getElementById("calorie-input").value = "";

        this.props.reloadComposedChart();
      } else if (res.data === false) {
        this.setState({
          insertCaloriesMessage: "Record could not be inserted!",
          insertCaloriesMessageColor: "red",
        });
      }
    });
  };

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>Insert Calories</h2>
        <div style={{ color: this.state.insertCaloriesMessageColor }}>
          <p style={messageStyle}>{this.state.insertCaloriesMessage}</p>
        </div>
        <h3 style={inputLabelStyle}>Calories</h3>
        <div style={inputDivStyle}>
          <input id="calorie-input" style={inputStyle} type="number" />
        </div>
        <br />
        <h3 style={inputLabelStyle}>Date</h3>
        <div style={inputDivStyle}>
          <input
            id="date-input"
            style={inputStyle}
            type="date"
            defaultValue={this.props.getDateXDaysBeforeToday(0)} // Adds today as default value
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

const messageStyle = {
  textAlign: "center",
};

export default CalorieCounterInsert;
