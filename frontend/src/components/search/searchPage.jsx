import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import UserPage from '../user/userPage';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

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

  backtoSearch = () => {
    this.setState(()=>{
      return {
        userlist: this.state.allList,
        userDefined: false,
        chosenUser: undefined
      }
    });
  }

  updateUser(text){
    console.log('clicked');
    let name = text
    this.setState(() => {return {userDefined: true}});
    this.setState(() => {return {chosenUser: name}});
  }

  render() {
    if (!this.state.userDefined){ 
      return (
        <Router>
          <div>
            <form className={this.state.classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Search" variant="outlined" onKeyUp={this.preciseSearch}/>
            </form>
            <div style={{marginTop:'30px'}}>
              {this.state.userlist.map((text, index) => (
                <div key={index} onClick={() => {this.updateUser(text)}}>
                  <Link to={'/'+text} style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem button key={text} >
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <div>
            <Link to={'/search'} style={{ textDecoration: 'none', color: 'black' }}>
              <Button
              variant="contained"
              color="primary"
              className={this.state.classes.button}
              startIcon={<ArrowBackIcon />}
              onClick={this.backtoSearch}
              >
                Back to Search
              </Button>
            </Link>
            <br/>
            <br/>
            <UserPage user={this.state.chosenUser} />
          </div>
        </Router>
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