import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import Navbar from "../Navbar/Navbar";
import Homepage from "../Homepage/Homepage";

function App() {
  return (
    <main className="App__Container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/home" component={Homepage} />
      </Switch>
    </main>
  );
}

export default App;
