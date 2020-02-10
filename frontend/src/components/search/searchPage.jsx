import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


import PersonIcon from '@material-ui/icons/Person';
import UserPage from '../user/userPage';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { classes: useStyles, allList: MockSearch, userlist: MockSearch, userDefined:false, chosenUser:undefined};
  }


  preciseSearch = (e) => {
    let letters = e.target.value;
    let tempList = this.state.allList;
    let re = new RegExp(('^'+letters),"gi");
    let newList = tempList.filter(element => {
      // console.log(re.test(element));
      return re.test(element);
    });
    console.log(re.test('Ben'))
    console.log(newList);
    this.setState(() => {
      return {userlist: newList};
    });    
  }

  updateUser = (text) => {
    console.log('clicked');
    console.log(text.target);
    let name = text.target.firstChild.nodeValue;
    try {
      if(name === null) {
        name = text.target.firstChild.firstChild.nodeValue;
      }
      console.log(name);
      this.setState(() => {return {userDefined: true}});
      this.setState(() => {return {chosenUser: name}});
    }
    catch(e) {
      return;
    }
  }

  render() {
    if (!this.state.userDefined){ 
      return (
          <div>
          <form className={this.state.classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Search" variant="outlined" onKeyUp={this.preciseSearch}/>
          </form>
            <div style={{marginTop:'30px'}}>
              {this.state.userlist.map((text, index) => (
                <div key={index} onClick={this.updateUser}>
                  <ListItem button key={text} >
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </div>
              ))}
            </div>
        </div>
      );
    }
    else {
      return (
        <UserPage user={this.state.chosenUser} />
      );
    }
  }
}

const MockSearch = [
  "Sebasiten",
  "Cheikh",
  "David",
  "Nafisa",
  "Julien",
  "Bobby",
  "Chimp",
  "Ben",
  "Phong",
  "Arianne",
  "Emy",
  "Bob",
  "Billy",
  "Nelly",
  "Jon"
]