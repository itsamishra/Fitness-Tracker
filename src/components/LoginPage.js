import React, { Component } from "react";

export class LoginPage extends Component {
  //
  loginButtonClickHandler = () => {
    this.props.sendLoginAttempt(
      document.getElementById("username-input").value,
      document.getElementById("password-input").value
    );
  };

  render() {
    return (
      <div>
        <p>
          Username: <input id="username-input" />
        </p>
        <p>
          Password: <input id="password-input" type="password" />
        </p>
        <button onClick={this.loginButtonClickHandler}>Login</button>
        <button>Create Account</button>
      </div>
    );
  }
}

export default LoginPage;
