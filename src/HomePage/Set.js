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
          <Grid.Column style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <Label content={'Set ' + setNumber} size='large' color='black' />
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <Label basic size='large' color='green' pointing='right' content='Reps' />
            <Input
              color='green'
              style={{ width: '65px' }}
              size="tiny" onChange={this.handleChange}
              name="reps"
              value={reps}
            />
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <Label basic size='large' color='green' pointing='right' content='Weight' />
            <Input
              style={{ width: '65px' }}
              size="tiny" onChange={this.handleChange}
              name="weight"
              value={weight} />
          </Grid.Column>
          <Grid.Column style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <Icon link color='red' size='large' onClick={this.handleDeleteSet} name="delete" />
          </Grid.Column>
        </Grid.Row>
    )
  }
}