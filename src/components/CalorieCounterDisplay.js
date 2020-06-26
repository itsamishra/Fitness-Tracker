import React, { Component } from "react";

export class CalorieCounterDisplay extends Component {
  state = {
    totalCalorieCountList: [],
  };

  componentDidMount() {
    // // Gets previous Monday
    // var date = new Date();
    // var day = date.getDay();
    // var prevMonday;
    // console.log(new Date().getDay());
    // if (date.getDay() == 0) {
    //   prevMonday = new Date().setDate(date.getDate() - 7);
    // } else {
    //   prevMonday = new Date().setDate(date.getDate() - day);
    // }
    // console.log(new Date(prevMonday));

    // Gets list of total calories for past 7 days
    let date = new Date();
    console.log(date);
  }

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>View Calories</h2>
      </div>
    );
  }
}

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

export default CalorieCounterDisplay;
