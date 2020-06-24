import React, { Component } from "react";

export class Header extends Component {
  render() {
    return <h1 style={headerStyle}>Fitness Tracker</h1>;
  }
}

const headerStyle = {
  textAlign: "center",
  color: "#2F2FA2",
  padding: "60px",
};

export default Header;
