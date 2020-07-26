import React, { Component } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./LoginForm.scss";
import AuthApiService from "../../services/auth-api-service";

export default class LoginForm extends Component {
  state = {
    error: null,
    email: "",
    password: "",
    disabled: true,
    isLoggedIn: false,
  };

  /** @function updates state with user input
   * and verifies the email and password are not < 1 chars
  */
  handleChange = (e) => {
    const userInput = e.target.value;
    this.setState({ disabled: false, error: null });
    if (userInput.length < 1) {
      this.setState({
        disabled: true,
        error: `${[e.target.name.charAt(0).toUpperCase()]}${[
          e.target.name.slice(1),
        ]} can not be empty`,
      });
    }
    this.setState({
      [e.target.name]: userInput,
    });
  };

  /** @function submits the form to the API
   * service which fires the fetch call using
   * the target values 
  */
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = this.state;
    AuthApiService.postLogin(email, password)
      .then((data) => {
        this.setState({ isLoggedIn: true });
        this.props.history.push("/home");
      })
      .catch((err) =>
        this.setState({
          error: err.error.charAt(0).toUpperCase() + err.error.slice(1),
          isLoggedIn: false,
        })
      );
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <form
          className="Login__Form"
          id="Login__Form"
          onSubmit={this.handleSubmit}>
          <h2 className="Login__Header">Login Here:</h2>
          <div>{error && <ErrorMessage error={error} />}</div>
          <div className="Input__Container">
            <label htmlFor="Login__Email">
              Email <i className="far fa-envelope"></i>
            </label>
            <input
              onChange={this.handleChange}
              type="email"
              required
              name="email"
              id="Login__Email"
            />
          </div>
          <div className="Input__Container">
            <label htmlFor="Login__Password">
              Password <i className="fas fa-lock"></i>
            </label>
            <input
              type="password"
              required
              name="password"
              id="Login__Password"
              onChange={this.handleChange}
            />
          </div>
          <input
            disabled={this.state.disabled ? "disabled" : ""}
            type="submit"
            id="Login__Submit"
            value="Login"
          />
        </form>
      </>
    );
  }
}
