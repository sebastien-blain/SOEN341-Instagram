import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '11px',
  },
}));

export default class Comment extends Component {
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { classes: useStyles };
  }

  render() {
    return (
      <Typography className={this.state.classes.text}><strong>{this.props.user}:</strong> {this.props.comment}</Typography>
    );
  }
  
}
