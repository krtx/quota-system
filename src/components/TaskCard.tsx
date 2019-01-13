import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
  description: string;
  quota: number;
  count: number;
  range: string;
  deleteHandler: () => void;
  incrementCountHandler: () => void;
}

interface State {}

class TaskCard extends Component<Props, State> {
  render () {
    return (
      <Card style={{marginTop: 10}}>
        <CardContent>
          <Typography color="textSecondary">
            {this.props.range}
          </Typography>
          <Typography variant="h5" color="textPrimary">
            {this.props.description}
          </Typography>
          <Typography color="textSecondary">
            current status: {this.props.count}/{this.props.quota}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={this.props.incrementCountHandler}>
            increment
          </Button>
          <Button size="small">history</Button>
          <Button color="secondary" size="small" onClick={this.props.deleteHandler}>
            delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default TaskCard;