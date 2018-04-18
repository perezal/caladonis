import React, { Component } from 'react';

import { Route } from "react-router-dom";
import { history } from "./helpers/history";
import { ConnectedRouter } from 'react-router-redux';

import './App.css';

import Nav from './pages/Nav';
import AccountPage from "./pages/AccountPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
            <Route path="/register" component={RegisterPage} />
          </main>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
