import React, { Component } from "react";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import axios from "axios";
import Landing from "./components/Landing";

export class App extends Component {
  state = {
    username: "",
    password: "",
    body: null,
  };

  sendLoginAttempt = (newUsername, newPassword) => {
    this.setState(
      {
        username: newUsername,
        password: newPassword,
      },
      () => {
        axios
          .get(
            `/authenticate-login?username=${this.state.username}&password=${this.state.password}`
          )
          .then((res) => {
            let loginStatus = res.data;

            if (loginStatus === true) {
              this.setState({
                body: <Landing />,
              });
            }
          });
      }
    );
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
