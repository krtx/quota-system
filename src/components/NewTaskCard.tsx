import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { TaskDefinition } from '../libs/Task';

const ranges = ['yearly', 'monthly', 'weekly', 'daily'];

interface Props {
  addTask: (task: TaskDefinition) => void;
}

class NewTaskCard extends Component<Props> {
  state = {
    description: '',
    range: 'weekly',
    quota: 5,
  };

  handleChange = (name : string) => (event : any) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event : any) => {
    this.props.addTask({
      description: this.state.description,
      quota: this.state.quota,
      range: this.state.range,
    });
  }

  render() {
    const rangeOptions = ranges.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));

    return (
      <Card style={{ marginTop: 10 }}>
        <CardContent>
          <Typography color="textSecondary">
            Add New Task
          </Typography>
          <TextField
            label="Description"
            fullWidth
            value={this.state.description}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('description')}
          />
          <TextField
            value={this.state.range}
            style={{ marginTop: 4 }}
            label="range"
            variant="outlined"
            fullWidth
            helperText="A week starts on monday"
            onChange={this.handleChange('range')}
            select>
            {rangeOptions}
          </TextField>
          <TextField
            label="quota"
            variant="outlined"
            style={{ marginTop: 14 }}
            fullWidth
            value={this.state.quota}
            onChange={this.handleChange('quota')}
            type="number"
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={this.handleSubmit}
            style={{ marginTop: 10 }}>
            Add
          </Button>
        </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>
    );
  }
}

export default NewTaskCard;