import React from "react";
import { connect } from 'react-redux';
import { authActions } from "../actions/auth.actions";

import { Grid, Form, Header, Message, Segment } from 'semantic-ui-react';

class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordRetype: '',
      email: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, email, password, passwordRetype } = this.state;
    if (password === passwordRetype) {
      const userData = {
        username: username,
        password: password,
        email: email
      }
      this.props.dispatch(authActions.signup(userData));
    } else {
      this.props.dispatch(authActions.signupFailure({
        password: ["Both passwords must match."]
      }))
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {

    const { loggingIn, signingUp, signupErrors } = this.props;
    const { password, passwordRetype } = this.state;

    const errors = signupErrors || {};

    const isEmailError = Array.isArray(errors.email);
    const isUsernameError = Array.isArray(errors.username);
    const isPasswordError = Array.isArray(errors.password);

    const errorItems = Object.keys(errors).map((key, index) => {
      return(
        <Segment key={key}>
          <Message.Header content={key.charAt(0).toUpperCase() + key.slice(1)}/>
          <Message.List items={errors[key]}/>
        </Segment>
      )
    })

    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, textAlign:'left' }}>
          <Header as='h1' color='green'>Sign up for Caladonis!</Header>
          <Form loading={signingUp || loggingIn} size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input fluid label='Email Address' error={isEmailError} icon='at' iconPosition='left' name='email' placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
              <Form.Input fluid label='Username' error={isUsernameError} icon='user' iconPosition='left' name='username' placeholder="Username" value={this.state.username} onChange={this.handleChange} />
              <Form.Group widths='equal'>
                <Form.Input fluid label='Password' error={isPasswordError} icon='lock' iconPosition='left' type='password' name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <Form.Input fluid label='Retype Password' error={password !== passwordRetype} icon='lock' iconPosition='left' type='password' name='passwordRetype' placeholder="Retype Password" value={this.state.passwordRetype} onChange={this.handleChange} />
              </Form.Group>
              <Form.Button fluid size='large' color='green' content='Sign Up' />
            </Segment>
          </Form>
          <Message style={{textAlign: 'left'}} hidden={!(isEmailError || isUsernameError || isPasswordError)} negative>
            {errorItems}
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn, signingUp, signupErrors } = state.authentication;
  return {
    loggingIn,
    signingUp,
    signupErrors
  };
}

const connectedSignupPage = connect(mapStateToProps)(SignupPage);


export default connectedSignupPage;