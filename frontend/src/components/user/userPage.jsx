import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class UserPage extends Component {
  render() {
    return (
      <Typography variant="h6" noWrap>
        {this.props.user}
      </Typography>
      );
  }
}