import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Label, Icon } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Nav extends React.Component {

  render() {

    const { loggedIn } = this.props;
    const username = localStorage.getItem('username');
    const loggedInAs = loggedIn ? username : "Login";
    // <Button positive><Link to="/login">Log In</Link></Button>;

    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Label as={Link} to={loggedIn ? "/account" : "/login"} color='blue' size='big' icon>
            <Icon name='user' />
            {loggedIn && 'Logged in as'}
            <Label.Detail>{loggedInAs}</Label.Detail>
          </Label>
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