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
        axios
          .get(
            `/authenticate-login?username=${this.state.username}&password=${this.state.password}`
          )
          .then((res) => {
            let loginStatus = res.data;

            // If login is successful, shows landing page
            if (loginStatus === true) {
              this.setState({
                body: (
                  <Landing displayCalorieCounter={this.displayCalorieCounter} />
                ),
              });
            }
          });
      }
    );
  };

  displayCalorieCounter = () => {
    console.log("TEST");
    this.setState({
      body: <CalorieCounter />,
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
