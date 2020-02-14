import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Message from '@material-ui/icons/Message';
import Close from '@material-ui/icons/Close';

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
  table: {
    margin: theme.spacing(1),
  },
}));

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { classes: useStyles, notFollowing: this.props.notFollowing, isUser: this.props.isUser};
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
             <Typography variant="h4" noWrap>
              <p><strong>{this.props.user}</strong></p>
            </Typography>
            <Typography variant="body1" align="left" paragraph="true">
              <table col width="500">
                <tr>
                  <td>{this.follow.length}</td>
                  <td>{this.follow.length}</td>
                  <td>{this.follow.length}</td>
                </tr>
                <tr>
                  <td>Posts</td>
                  <td>Followers</td>
                  <td>Following</td>
                </tr>
              </table>
            </Typography>
            <Typography variant="caption" noWrap paragraph="true">
            <textarea id="bio" cols="60" disabled maxlength="200">
            *Profile bio* This is a profile bio 
            </textarea>
            </Typography>
            <p>Followed by .... </p>
            <div>
              {//this.state.isUser &&
                <div>
                <Button
                variant="contained"
                color="primary"
                className={this.state.classes.button}
                startIcon={<PersonAddIcon />}
                onClick={this.follow}
                disabled={!this.state.notFollowing}
                >
                  Follow
                </Button>

                <Button
                variant="contained"
                color="secondary"
                className={this.state.classes.button}
                startIcon={<Close />}
                onClick={this.unfollow}
                disabled={this.state.notFollowing}
                >
                  Unfollow
                </Button>

                <Button
                variant="contained"
                color="default"
                className={this.state.classes.button}
                startIcon={<Message />}
                onClick={this.message}
                >
                  Message
                </Button>
                </div>}
            </div>
            <hr />
            <p>*IMAGE SECTION</p>
          </div>
      );
  }
}
