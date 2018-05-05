import React from 'react';
import { connect } from 'react-redux';
import { workoutsActions } from '../actions/workouts.actions';

import { Button, Container, Accordion, Dimmer, Loader, Segment, Header, Icon } from 'semantic-ui-react';

import Workout from './Workout.js';

class HomePage extends React.Component {

  componentDidMount() {
    if (!this.props.workouts[0]) {
      this.props.dispatch(workoutsActions.fetchWorkouts());
    }
  }

  getWorkouts(e) {
    e.preventDefault();
    this.props.dispatch(workoutsActions.fetchWorkouts());
  }

  createWorkout(e) {
    e.preventDefault();
    this.props.dispatch(workoutsActions.createWorkout());
  }

  render() {
    const { workouts, isFetching, isSaving } = this.props;
    const workoutList = workouts ? workouts.reverse().map(workout => <Workout key={workout.id} {...workout} />) : "";

    return (
      <div className="home">
        <Dimmer active={isSaving} page>
          <Loader />
        </Dimmer>
        <Container>
          <Header as='h2' icon textAlign='center'>
            <Icon name='heartbeat' />
            <Header.Content>Workouts</Header.Content>
          </Header>

            <Segment basic textAlign='center'>
              <Button onClick={this.getWorkouts.bind(this)} positive icon="repeat" loading={isFetching} disabled={isFetching} content="Load Workouts" />
              <Button onClick={this.createWorkout.bind(this)} positive icon="add" disabled={isFetching} content="New Workout" />
            </Segment>
          <Accordion styled fluid>
            {workoutList}
          </Accordion>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { workouts, isFetching, isSaving } = state.workouts;
  return {
    workouts,
    isFetching,
    isSaving
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);

export default connectedHomePage;