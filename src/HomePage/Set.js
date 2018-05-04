import React from 'react';

import { Button, Input, Segment } from 'semantic-ui-react';

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
    // work on segment: basic & compact vs segment.group horizontal
    const { reps, weight } = this.props;
    return (
      <Segment.Group horizontal className="set">
        <Segment basic>
          <Input label='Reps' size="tiny" onChange={this.handleChange} name="reps" placeholder="reps" value={reps} />
        </Segment>
        <Segment basic>
          <Input label='Weight' size="tiny" onChange={this.handleChange} name="weight" placeholder="weight" value={weight} />
        </Segment>
        <Segment compact>
          <Button basic onClick={this.handleDeleteSet} negative content="Delete" icon="delete" />
        </Segment>
      </Segment.Group>
    )
  }
}