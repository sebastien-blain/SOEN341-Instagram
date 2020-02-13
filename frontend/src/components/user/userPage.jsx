import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { classes: useStyles, notFollowing: this.props.notFollowing };
  }

  follow = () => {
    this.setState(() => {
      return(
        {
          notFollowing: true
        }
      )
    })
    fetch(this.props.usedApi+'/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      },
      body: JSON.stringify({
        follow: this.props.user
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((e) =>  {
      console.log(e)
    })
  }

  render() {
    return (
      <div>
      <Typography variant="h6" noWrap>
        {this.props.user}
      </Typography>
      <Button
      variant="contained"
      color="primary"
      className={this.state.classes.button}
      startIcon={<PersonAddIcon />}
      onClick={this.follow}
      disabled={this.state.notFollowing}
      >
        Follow
      </Button>
      </div>
      );
  }
}