import React, { Component } from 'react';
import ImageBox from './imageBox';

export default class ImageListPage extends Component {
  
  render() {
    return (
      <ImageBox image={mockImage} currentUser={this.props.currentUser} token={this.props.token}/>
    );
  }
}


  //#region mockImageForTest
  const mockImage = {
    user: "Bob",
    url: "https://i.redd.it/z9l08cn8wde41.png",
    like: true,
    nb_like: 10,
    description: "This is the caption",
    comments: [
      {
        user: "Mia",
        comment: "Nice pic"
      },
      {
        user: "Khalifa",
        comment: "Cool pic"
      },
    ]
  }
  //#endregion