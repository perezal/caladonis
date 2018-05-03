import React from 'react';
import Set from './Set';

import uniqueId from 'lodash/uniqueId';

import { Input, Segment, Button } from 'semantic-ui-react';

export default class Exercise extends React.Component {
  constructor() {
    super();

    this.updateSet = this.updateSet.bind(this);
    this.createSet = this.createSet.bind(this);
    this.deleteSet = this.deleteSet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
  }

  updateSet(set) {
    const { sets, name, id } = this.props;
    const newSets = sets.map( item => item.id === set.id ? set : item );
    this.props.updateExercise({
      name,
      id,
      sets: newSets
    });
  }

  createSet() {
    const id = uniqueId('new');
    console.log(id);
    const set = {
      id: id,
      reps: '',
      weight: ''
    };
    const newSets = this.props.sets;
    newSets.push(set);
    this.props.updateExercise({
      name: this.props.name,
      id: this.props.id,
      sets: newSets,
    });
  }

  deleteSet(set) {
    const { sets, name, id } = this.props;
    const newSets = sets.filter( item => item.id !== set.id );
    this.props.updateExercise({
      name: name,
      id: id,
      sets: newSets
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { id, sets } = this.props;
    this.props.updateExercise({
      sets,
      id,
      [name]: value
    });
  }

  handleDeleteExercise() {
    this.props.deleteExercise(this.props.id);
  }

  render() {
    const { sets, name } = this.props;
    const setList = sets ? sets.map(set => <Set updateSet={this.updateSet} deleteSet={this.deleteSet} key={set.id} {...set} />) : "";

    return (
      <Segment.Group raised className="exercise">
          <Segment>
            <Input action={
              <Button onClick={this.handleDeleteExercise} color="red" content="Exercise" icon="delete" />
            } fluid name="name" onChange={this.handleChange} value={name} />
          </Segment>
          {setList}
          <Segment>
            <Button fluid onClick={this.createSet} color="blue" content="Set" icon="add" />
          </Segment>
      </Segment.Group>
    )
  }
}