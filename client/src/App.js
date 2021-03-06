import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import Poll from "./components/Poll"
import Npoll from "./components/Npoll"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
class App extends Component {
  render() {
    return (
      <Router>
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={Npoll} />
          <Route exact path="/poll/:pollID" component={Poll} />

        </Switch>

      </Router>
    );
  }
}

export default App;
