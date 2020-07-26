import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthApiService from "../../services/auth-api-service";

describe("Login Form", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <LoginForm />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("succeeds with a valid email and password", async () => {
    const email = "eve.holt@reqres.in";
    const password = "test";
    const token = { token: "QpwL5tke4Pnpja7X4" };
    const data = await AuthApiService.postLogin(email, password);
    expect(data).toStrictEqual(token);
  });

  it("fails with invalid email and password", async () => {
    const email = "eve.holt@gmail.com";
    const password = "test";
    const error = {
      "error": "user not found",
    }
    const data = await AuthApiService.postLogin(email, password).catch(e => {
      expect(e).toEqual(error)
    });
  });
});
