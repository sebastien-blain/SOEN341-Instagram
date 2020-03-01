import React, { Component } from 'react';
import ImageBox from './imageBox';
import Button from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default class ImageListPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { classes: useStyles, images: this.props.images};
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
      this.setState(() => {
        return({images: resJson});
      });
    })
    .catch((e) =>  {
      console.log(e);
      this.setState(() => {
        return({images: []});
      });
    })
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.props.isFeed ?
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
            <div>
              {this.state.images.map( (image, index) => {
                console.log(image);
                return (
                  <div style={{margin:'30px', position:'relative'}} key={index}>
                    <ImageBox image={image} currentUser={this.props.currentUser} usedApi={this.props.usedApi} token={this.props.token}/>
                  </div>
                )
              })}
            </div>
          </div>
        :
          <div>
            {this.props.images.map( (image, index) => {
              console.log(image);
              return (
                <div style={{margin:'30px', position:'relative'}} key={index}>
                  <ImageBox image={image} currentUser={this.props.currentUser} usedApi={this.props.usedApi} token={this.props.token}/>
                </div>
              )
            })}
          </div>
        }
      </div>
    );
  }
}