import React from 'react';
import Exercise from './Exercise';
import { connect } from 'react-redux';

import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import { Label, Button, Accordion, Icon, TextArea, Segment } from 'semantic-ui-react';

import { workoutsActions } from '../actions/workouts.actions';

class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: this.props.exercises,
      date: this.props.date,
      notes: this.props.notes,
      account: this.props.account,
      id: this.props.id,
    }

    this.handleChange = this.handleChange.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    const { account, date, exercises, id, notes } = this.state;
    const data = Object.assign({
      id,
      date,
      notes,
      account,
      exercises,
    });
    this.props.dispatch(workoutsActions.saveWorkout(data));
  }

  createExercise() {
    const id = uniqueId('new');
    console.log(id);
    const exercise = {
      id: id,
      name: 'New Exercise',
      sets: []
    };
    const newExercises = this.state.exercises;
    newExercises.push(exercise);
    this.setState({
      exercises: newExercises,
    });
  }

  deleteExercise(exercise_id) {
    let { exercises } = this.state;
    exercises = exercises.filter( x => x.id !== exercise_id )
    this.setState({
      exercises: exercises
    });
  }

  updateExercise(exercise) {
    const { exercises } = this.state;
    const newExercises = exercises.map( item => item.id === exercise.id ? exercise : item );
    this.setState({
      exercises: newExercises,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  deleteWorkout() {
    const { id } = this.state;
    this.props.dispatch(workoutsActions.deleteWorkout(id));
  }

  toggleAccordion() {
    this.setState({
      accordionOpen: !this.state.accordionOpen
    })
  }

  render() {
    const { exercises, date, notes, accordionOpen } = this.state;
    const exerciseList = exercises.map(exercise => (
      <Exercise
        updateExercise={this.updateExercise.bind(this)}
        deleteExercise={this.deleteExercise.bind(this)}
        key={exercise.id}
        {...exercise}
      />
      ));

    return (
      <div className="workout">
        <Accordion.Title active={accordionOpen} onClick={this.toggleAccordion}>
          <Icon name='dropdown' />
          Workout on {moment(date).format('M/D/Y')}
        </Accordion.Title>
        <Accordion.Content active={accordionOpen}>
          <Segment.Group>
            {exercises &&
              exerciseList}
            <Segment>
              <Button fluid onClick={this.createExercise.bind(this)} color="orange" content="Exercise" icon="add" />
            </Segment>
            <Segment>
              <Button.Group fluid>
                <Button onClick={this.deleteWorkout.bind(this)} negative content="Delete Workout" />
                <Button.Or style={{ borderLeft: '0.15em solid transparent', borderRight: '0.15em solid transparent' }} />
                <Button onClick={this.handleSave.bind(this)} positive content="Save Workout" />
              </Button.Group>
            </Segment>
            <Segment>
              <Label content='Notes'/>
              <TextArea autoHeight style={{ minHeight: '100px', width: '100%' }} name="notes" onChange={this.handleChange} value={notes} />
            </Segment>
          </Segment.Group>
        </Accordion.Content>
      </div>
    )
  }
}

const connectedWorkout = connect()(Workout);

export default connectedWorkout;