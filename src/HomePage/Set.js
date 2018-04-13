import React from 'react';

import { Form, Segment } from 'semantic-ui-react';

export default class Set extends React.PureComponent {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteSet = this.handleDeleteSet.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { reps, weight, id } = this.props;
    this.props.updateSet({
      reps,
      weight,
      id,
      [name]: value
    });
  }

  handleDeleteSet() {
    const { reps, weight, id } = this.props;
    this.props.deleteSet({
      reps,
      weight,
      id
    });
  }

  render() {

    const { reps, weight } = this.props;
    return (
      <Segment className="set">
        <Form.Input label='Reps' size="tiny" onChange={this.handleChange} name="reps" placeholder="reps" value={reps} />
        <Form.Input label='Weight' size="tiny" onChange={this.handleChange} name="weight" placeholder="weight" value={weight} />
        <Form.Button fluid basic onClick={this.handleDeleteSet} negative content="Delete" icon="delete" />
      </Segment>
    )
  }
}