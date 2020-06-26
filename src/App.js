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
    development: true,
  };

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
        />
      ),
    });
  };

  componentDidMount() {
    // Show login page if not logged in, otherwise show landing page
    this.setState({
      body: <LoginPage sendLoginAttempt={this.sendLoginAttempt} />,
    });
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
