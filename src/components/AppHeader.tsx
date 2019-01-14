import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  userName: string;
}

interface State {}

class AppHeader extends Component<Props, State> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6" color="inherit">Quota System</Typography>
            <Typography variant="caption" color="inherit">{this.props.userName}</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppHeader;