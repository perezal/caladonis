import React, { Component } from "react";
import { connect } from 'react-redux';

import { authActions } from "../actions/auth.actions";

import { Grid, Form, Segment, Header, Message } from 'semantic-ui-react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    new Promise((resolve, reject) => {
      this.props.dispatch(authActions.login(username, password));
      resolve();
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {

    const { loggingIn, loginFailed } = this.props;

    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='orange'>I am the login page!</Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder="Username" value={this.state.username} onChange={this.handleChange} />
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} />
              <Form.Button loading={loggingIn} fluid size='large' color='orange' content='Login' />
            </Segment>
          </Form>
          <Message warning content="If you're looking to try out the production app, you can log in with the username 'guest' and password 'guestpass'" />
          <Message hidden={!loginFailed} negative content="Login Failed" />
        </Grid.Column>
      </Grid>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);

export default connectedLoginPage;