import React, { Component } from 'react';

import { Route } from "react-router-dom";
import { history } from "./helpers/history";
import { ConnectedRouter } from 'react-router-redux';

import './App.css';

import Nav from './components/Nav';
import AccountPage from "./AccountPage/AccountPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";

class App extends Component {
  render() {

    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <main>
            <Nav />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/signup" component={SignupPage} />
          </main>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
