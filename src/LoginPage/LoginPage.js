import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authActions } from "../actions/auth.actions";

import { Grid, Form, Header, Message, Button, Icon } from 'semantic-ui-react';

class LoginPage extends React.Component {
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

    this.props.dispatch(authActions.login(username, password));
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
          <Form className='attached fluid segment' loading={loggingIn} size='large' onSubmit={this.handleSubmit}>
            <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder="Username" value={this.state.username} onChange={this.handleChange} />
            <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            <Button fluid size='large' color='orange' content='Login' />
          </Form>
          <Message attached='bottom'>
            <Icon name='help' />
            Don't have an account?&nbsp;<Link to='/signup'>Sign up here</Link>&nbsp;instead.
          </Message>
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