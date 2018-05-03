import React from 'react';
import Exercise from './Exercise';
import { connect } from 'react-redux';

import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import { Form, Accordion, Icon, TextArea } from 'semantic-ui-react';

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
      <Form className="workout">
        <Accordion.Title onClick={this.toggleAccordion}>
          <Icon name='dropdown' />
          Workout on {moment(date).format('M/D/Y')}
        </Accordion.Title>
        <Accordion.Content active={accordionOpen}>
          <Form.Group>
            <Form.Button onClick={this.handleSave.bind(this)} positive content="Save Workout" />
            <Form.Button onClick={this.deleteWorkout.bind(this)} negative content="Delete Workout" />
          </Form.Group>
          {exercises &&
            exerciseList}
          <Form.Button onClick={this.createExercise.bind(this)} color="blue" content="Exercise" icon="add" />
          <TextArea autoHeight style={{ minHeight: '100px' }} name="notes" onChange={this.handleChange} value={notes} />
        </Accordion.Content>
      </Form>
    )
  }
}

const connectedWorkout = connect()(Workout);

export default connectedWorkout;