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
import TextField from '@material-ui/core/TextField';

import ImageListPage from '../images/ImageListPage';
//main page
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
      nbPost: 0,
      bio: this.props.bio,
      images: []
    };
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
      this.setState(() => {
        return ({
          nbFollowers: responseJson.nb_followers,
          nbFollowing: responseJson.nb_following,
          nbPost: responseJson.nb_pictures,
          bio: responseJson.bio,
          images: responseJson.pictures
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

  submitBio = (e) => {
    console.log(e.target.value)
    const text = e.target.value

    fetch(this.props.usedApi+'/user/update/bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      },
      body: JSON.stringify({
        bio: text
      }),
    })
    .then((res) => {
      console.log(res.json())
      this.setState(() => {
        return {
          bio: text
        }
      })
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
        {this.props.isUser ? 
        <TextField
        id="standard-full-width"
        label="Bio"
        style={{ margin: 8 }}
        placeholder={this.state.bio}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        helperText="Update your bio here"
        onBlur={this.submitBio}
        />
        :
        <Typography variant="h6" noWrap>{this.state.bio}</Typography>
        }
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
          <ImageListPage images={this.state.images} usedApi={this.props.usedApi} currentUser={this.props.currentUser} token={this.props.token}/>
      </div>
    );
  }
}
