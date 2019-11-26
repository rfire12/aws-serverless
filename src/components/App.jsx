import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../assets/normalize.css";

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/">
                <h1>Test</h1>
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
