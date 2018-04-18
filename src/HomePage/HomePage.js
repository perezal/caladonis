import React from 'react';
import { connect } from 'react-redux';
import { workoutsActions } from '../actions/workouts.actions';
import LoadingAnimation from '../components/LoadingAnimation';

import { Button, Container, Accordion, Dimmer, Loader } from 'semantic-ui-react';

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
    const workoutList = workouts ? workouts.map(workout => <Workout key={workout.id} {...workout} />) : "";
    console.log(isSaving);

    return (
      <div className="home">
        <Dimmer active={isSaving} page>
          <Loader />
        </Dimmer>
        <Container>
          <h2>Here are your workouts</h2>
          {isFetching &&
            <LoadingAnimation />
          }
          {!isFetching &&
            <div>
              <Button onClick={this.getWorkouts.bind(this)} positive>Reload Workouts</Button>
              <Button onClick={this.createWorkout.bind(this)} positive>New Workout</Button>
            </div>
          }
          <Accordion>
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