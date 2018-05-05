import React from "react";

import { Button } from 'semantic-ui-react';
import { authActions } from '../actions/auth.actions';
import { connect } from 'react-redux';


class AccountPage extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(authActions.logout());
  }

  render() {

    return (
      <div>
        <h1>I am the account page!</h1>
        <Button onClick={this.handleLogout} negative content="Log Out" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn, loggingIn, loginFailed } = state.authentication;
  return {
    loggedIn,
    loggingIn,
    loginFailed
  };
}

const connectedAccountPage = connect(mapStateToProps)(AccountPage);

export default connectedAccountPage;