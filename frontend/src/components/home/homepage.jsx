import React, { Component } from 'react';
import ImageListPage from '../images/ImageListPage';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    this.state = { classes: useStyles, images: [], loading: false};
  }

  componentDidMount() {
    this.setState({loading: true});
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
      this.setState({loading: false});
    })
    .catch((e) =>  {
      console.log(e);
      this.setState(() => {
        return({images: []});
      });
    })
  }

  reloadFeed = () => {
    this.setState({loading: true});
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
      this.setState({loading: false});
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
          endIcon={this.state.loading ? <CircularProgress size="20px" color="secondary"/> : <SyncIcon />}
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