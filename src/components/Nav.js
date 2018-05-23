import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

class Nav extends React.Component {

  render() {

    const { loggedIn } = this.props;
    const username = localStorage.getItem('username');
    const loggedInAs = loggedIn ? username : "Login";

    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Signup</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            as={Link}
            to={loggedIn ? "/account" : "/login"}
            color='blue'
            content={loggedInAs}
            icon='user'
            labelPosition='left'
            label={ loggedIn && { color: 'blue', content: 'Logged in as' }}
          />
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