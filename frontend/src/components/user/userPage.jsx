import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Close from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    minWidth: 650,
  },
}));

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      classes: useStyles,
      isFollowing: this.props.isFollowing,
      nbFollowers: 0,
      nbFollowing: 0,
      nbPost: 0
    };
    console.log(this.state.isFollowing)
  }

  componentDidMount() {
    fetch(this.props.usedApi+'/user/'+this.props.user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState(() => {
        return ({
          nbFollowers: responseJson.nb_followers,
          nbFollowing: responseJson.nb_following,
          nbPost: responseJson.nb_pictures,
        });
      });
    })
  }

  follow = () => {
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
      this.setState(() => {
        return(
          {
            isFollowing: true,
            nbFollowers: this.state.nbFollowers + 1,
          }
        )
      })
      console.log(responseJson);
    })
    .catch((e) =>  {
      console.log(e)
    })
  }

  unfollow = () => {
    fetch(this.props.usedApi+'/unfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      },
      body: JSON.stringify({
        unfollow: this.props.user
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState(() => {
        return(
          {
            isFollowing: false,
            nbFollowers: this.state.nbFollowers - 1,
          }
        )
      })
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
          {this.props.user}
        </Typography>
        <br/>
        <div>
          <TableContainer component={Paper}>
            <Table className={this.state.classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Post</TableCell>
                  <TableCell align="center">Followers</TableCell>
                  <TableCell align="center">Following</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell align="center">{this.state.nbPost}</TableCell>
                    <TableCell align="center">{this.state.nbFollowers}</TableCell>
                    <TableCell align="center">{this.state.nbFollowing}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br/>
        <textarea id="bio" cols={60} maxLength={200} placeholder='*Profile bio* This is a profile bio' >
        </textarea>
        <p>Followed by .... </p>
            {!this.props.isUser ? 
              <div>
                {!this.state.isFollowing ? 
                  <Button
                    variant="contained"
                    color="primary"
                    className={this.state.classes.button}
                    startIcon={<PersonAddIcon />}
                    onClick={this.follow}
                  >
                    Follow
                  </Button>
                :
                  <Button
                    variant="contained"
                    color="secondary"
                    className={this.state.classes.button}
                    startIcon={<Close />}
                    onClick={this.unfollow}
                  >
                    Unfollow
                  </Button>
                } 
              </div> : <div></div>
            }
            <hr />
            <p>*IMAGE SECTION</p>
          </div>
      );
  }
}
