import React from 'react';

import { Route } from "react-router-dom";
import { history } from "./helpers/history";
import { Provider } from 'react-redux';
import { store } from "./helpers/store";
import { ConnectedRouter } from 'react-router-redux';

import './App.css';

import Nav from './components/Nav';
import AccountPage from "./AccountPage/AccountPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";

class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <main>
            <Nav />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/signup" component={SignupPage} />
          </main>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
