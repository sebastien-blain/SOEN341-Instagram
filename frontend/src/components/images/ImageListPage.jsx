import React, { Component } from 'react';
import ImageBox from './imageBox';

export default class ImageListPage extends Component {

  render() {
    return (
      <div style={{width: '100%'}}>
        {this.props.images.map( (image, index) => {
          console.log(image);
          return (
            <div style={{margin:'30px', position:'relative'}} key={index}>
              <ImageBox image={image} currentUser={this.props.currentUser} usedApi={this.props.usedApi} token={this.props.token}/>
            </div>
          )
        })}
      </div>
    );
  }
}