import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReservationsTable from "./ReservationsTable/ReservationsTable";
import ReservationForm from "./ReservationForm/ReservationForm";
import Button from "@material-ui/core/Button";
import "./main.css";
import "../assets/normalize.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="container">
            <h2 className="title">Reservations</h2>
            <Button href="/create" color="primary">
              Create
            </Button>
            <ReservationsTable />
          </div>
        </Route>
        <Route path="/create">
          <div className="container">
          <h2 className="title">Create Reservation</h2>
            <Button href="/" color="primary">
              Go back
            </Button>
            <ReservationForm />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
