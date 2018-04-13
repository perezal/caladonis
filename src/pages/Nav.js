import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { authActions } from '../actions/auth.actions';

class Nav extends React.Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(authActions.logout());
  }

  render() {

    const { loggedIn } = this.props;
    const username = localStorage.getItem('username');
    const loggedInAs = loggedIn ? "You are logged in as " + username : "You are not logged in";
    const logInOut = loggedIn ? <Button onClick={this.handleLogout} negative content="Log Out" /> : <Button positive><Link to="/login">Log In</Link></Button>;


    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/account">Account</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <p>{loggedInAs}</p>
          {logInOut}
        </Menu.Item>
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}

const connectedNav = connect(mapStateToProps)(Nav);


export default connectedNav;