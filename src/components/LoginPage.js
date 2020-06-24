import React, { Component } from "react";

export class LoginPage extends Component {
  state = {
    message: "",
  };

  loginButtonClickHandler = () => {
    // Resets message
    this.setState({
      message: "",
    });

    this.props.sendLoginAttempt(
      document.getElementById("username-input").value,
      document.getElementById("password-input").value
    );

    document.getElementById("username-input").value = "";
    document.getElementById("password-input").value = "";
  };

  createAccountButtonClickHandler = () => {
    this.setState({
      message: "Create Account is currently disabled!",
    });
  };

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>Username</h2>
        <div style={inputDivStyle}>
          <input id="username-input" style={inputStyle} />
        </div>

        <br />
        <br />

        <h2 style={inputLabelStyle}>Password</h2>
        <div style={inputDivStyle}>
          <input id="password-input" type="password" style={inputStyle} />
        </div>
        <br />
        <br />
        <br />
        <br />

        <button onClick={this.loginButtonClickHandler} style={buttonStyle}>
          Login
        </button>
        <br />
        <button
          onClick={this.createAccountButtonClickHandler}
          style={buttonStyle}
        >
          Create Account
        </button>
        <p style={messageStyle}>{this.state.message}</p>
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

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

const inputDivStyle = {
  textAlign: "center",
};

const inputStyle = {
  width: "25%",
  borderRadius: "25px",
  border: "5px solid #2F2FA2",

  // boxSizing: "border-box",
};

const messageStyle = {
  color: "red",
  textAlign: "center",
};

export default LoginPage;
