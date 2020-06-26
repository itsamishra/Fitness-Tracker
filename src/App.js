import React, { Component } from "react";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import axios from "axios";
import Landing from "./components/Landing";
import CalorieCounter from "./components/CalorieCounter";

export class App extends Component {
  state = {
    username: "",
    password: "",
    body: null,
    weekCalorieTotal: {},
    development: true,
  };

  getWeekCalorieTotal = () => {
    return this.state.weekCalorieTotal;
  };

  // Tries to log in
  sendLoginAttempt = (newUsername, newPassword) => {
    // Updates state with new username and password
    this.setState(
      {
        username: newUsername,
        password: newPassword,
      },
      // Checks to see if username & password are valid
      () => {
        // Logs in with "dummy" username & password if app is running in development mode
        if (
          this.state.development === true &&
          newUsername === "dummy" &&
          newPassword === "dummy"
        ) {
          this.displayLanding();
        }
        // If not running in development mode, tries to log in regularly
        else {
          axios
            .get(
              `/authenticate-login?username=${this.state.username}&password=${this.state.password}`
            )
            .then((res) => {
              let loginStatus = res.data;

              // If login is successful, shows landing page
              if (loginStatus === true) {
                this.displayLanding();
              }
            });
        }
      }
    );
  };

  // Adds new record to calorie_counts table
  addNewCalorieCount = (calorieCount, date) => {
    return axios.get(
      `/add-calorie-count?username=${this.state.username}&password=${this.state.password}&calorieCount=${calorieCount}&date=${date}`
    );
  };

  // Returns date "x" days before today's date
  // Taken & updated from: https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php
  getDateXDaysBeforeToday = (daysBefore) => {
    let date = new Date();
    date.setDate(date.getDate() - daysBefore);
    let dd = date.getDate();

    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  setCalorieTotalForWeek = () => {
    let weekCalorieTotal = {};
    let dateList = [];

    // Creates list of dates for past week
    for (let i = 0; i < 7; i++) {
      let date = this.getDateXDaysBeforeToday(i);
      weekCalorieTotal[i] = { date: date, totalCalories: 0 };
      dateList.push(date);
    }

    // Gets calories consumed in past week
    return (
      axios
        .get(
          `/get-total-calories-by-dates?username=${
            this.state.username
          }&password=${this.state.password}&dateList=${encodeURI(
            JSON.stringify(dateList)
          )}`
        )
        // Updates state with new data
        .then((res) => {
          let totalCaloriesByDayObj = res.data;

          // Updates weekCalorieTotal object
          for (let i in Object.keys(weekCalorieTotal)) {
            let numCalories = totalCaloriesByDayObj[weekCalorieTotal[i].date];
            if (numCalories === undefined) numCalories = 0;

            weekCalorieTotal[i].totalCalories = numCalories;
          }

          // Updates state
          this.setState({
            weekCalorieTotal: weekCalorieTotal,
          });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  // Displays Landing page
  displayLanding = () => {
    this.setState({
      body: <Landing displayCalorieCounter={this.displayCalorieCounter} />,
    });
  };

  // Displays Calorie Counter page
  displayCalorieCounter = () => {
    this.setState({
      body: (
        <CalorieCounter
          displayLanding={this.displayLanding}
          addNewCalorieCount={this.addNewCalorieCount}
          getDateXDaysBeforeToday={this.getDateXDaysBeforeToday}
          setCalorieTotalForWeek={this.setCalorieTotalForWeek}
          getWeekCalorieTotal={this.getWeekCalorieTotal}
        />
      ),
    });
  };

  componentDidMount() {
    // Show login page if not logged in, otherwise show landing page
    this.setState({
      body: <LoginPage sendLoginAttempt={this.sendLoginAttempt} />,
    });

    this.setCalorieTotalForWeek();
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.body}
      </div>
    );
  }
}

export default App;
