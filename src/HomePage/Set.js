import React from 'react';

import { Grid, Input, Icon, Label } from 'semantic-ui-react';

export default class Set extends React.PureComponent {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteSet = this.handleDeleteSet.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { reps, weight, id } = this.props;
    // only integers are acceptable on a set
    const intValue = parseInt(value, 10) ? parseInt(value, 10) : '';
    this.props.updateSet({
      reps,
      weight,
      id,
      [name]: intValue
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
  // <Button basic onClick={this.handleDeleteSet} negative content="Delete" icon="delete" />


  render() {
    // work on segment: basic & compact vs segment.group horizontal
    const { reps, weight, setNumber } = this.props;
    return (
        <Grid.Row>
          <Grid.Column width="14">
            <Label content={'Set ' + setNumber} basic size='large' color='black' pointing='right' />
            <Label basic size='large' color='green' pointing='right' content='Reps' />
            <Input
              color='green'
              style={{ width: '70px' }}
              size="tiny" onChange={this.handleChange}
              name="reps"
              value={reps}
            />
            <Label basic size='large' color='green' pointing='right' content='Weight' />
            <Input
              style={{ width:"70px" }}
              size="tiny" onChange={this.handleChange}
              name="weight"
              value={weight} />
          </Grid.Column>
          <Grid.Column width="2">
            <Icon link color='red' onClick={this.handleDeleteSet} name="delete" />
          </Grid.Column>
        </Grid.Row>
    )
  }
}