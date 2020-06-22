import React, { Component } from "react";

export class App extends Component {
  state = {
    loggedIn: false,
    username: "",
    password: "",
  };

  render() {
    if (this.state.loggedIn === false) {
      return <div>NEED TO LOGIN!</div>;
    } else {
      return <div>LOGGED IN!</div>;
    }
  }
}

export default App;
