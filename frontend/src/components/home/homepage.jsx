import React, { Component } from 'react';
import ImageListPage from '../images/ImageListPage';
import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { classes: useStyles, images: []};
  }

  componentDidMount() {
    fetch(this.props.usedApi+'/feed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      }
    })
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({images: resJson});
    })
    .catch((e) =>  {
      console.log(e);
      this.setState(() => {
        return({images: []});
      });
    })
  }

  reloadFeed = () => {
    fetch(this.props.usedApi+'/feed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      }
    })
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({images: resJson});
    })
    .catch((e) =>  {
      console.log(e);
      this.setState(() => {
        return({images: []});
      });
    })
  }

  render() {
    return(
      <div>
        <Button
          variant="contained"
          color="primary"
          className={this.state.classes.button}
          endIcon={<SyncIcon />}
          onClick={this.reloadFeed}
        >
          Reload
        </Button>
        <ImageListPage 
          images={this.state.images}
          currentUser={this.props.currentUser}
          usedApi={this.props.usedApi}
          token={this.props.token}
        />
      </div>
    );
  }

}