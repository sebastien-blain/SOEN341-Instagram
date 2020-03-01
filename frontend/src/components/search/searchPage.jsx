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

import {BrowserRouter as Router, Link} from 'react-router-dom';

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
    this.state = { classes: useStyles, allList: [], userlist: [], userDefined:false, chosenUser:undefined};
  }


  preciseSearch = (e) => {
    let letters = e.target.value;
    let tempList = this.state.allList;
    let re = new RegExp(('^'+letters),"gi");
    let newList = tempList.filter(element => {
      return re.test(element.username);
    });
    this.setState(() => {
      return {userlist: newList};
    });    
  }

  componentDidMount() {
    this.updateList();
  }

  updateList = () => {
    fetch(this.props.usedApi+'/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState(() => {
        return {
          allList: responseJson,
          userlist: responseJson,
          userDefined: false,
          chosenUser: undefined
        };
      })
    })
    .catch((e) =>  {
      console.log(e)
      this.setState(() => {
        return {
          allList: MockSearch,
          userlist: MockSearch,
          userDefined: false,
          chosenUser: undefined
        };
      })
    })
  }

  updateUser(text){
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
              <TextField id="outlined-basic" label="Search" variant="outlined" onFocus={this.updateList} onKeyUp={this.preciseSearch}/>
            </form>
            <div style={{marginTop:'30px'}}>
              {this.state.userlist.map((text, index) => (
                <div key={index} onClick={() => {this.updateUser(text)}}>
                  <Link to={'/'+text.username} style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem button key={text.username} >
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={text.username} />
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
              color="primary"
              className={this.state.classes.button}
              startIcon={<ArrowBackIcon />}
              onClick={this.updateList}
              >
                Back to Search
              </Button>
            </Link>
            <br/>
            <br/>
            <UserPage user={this.state.chosenUser.username} currentUser={this.props.currentUser} isUser={false} token={this.props.token} isFollowing={this.state.chosenUser.already_follow} usedApi={this.props.usedApi} />
          </div>
        </Router>
      );
    }
  }
}

const MockSearch = [
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Sebasiten"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "David"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Cheikh"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Nafisa"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Phong"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Julien"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Bobby"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Arianne"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "King T'Chala"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Mia"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Khalifa"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Bob"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Naruto"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Ronaldo"
  },
  {
    "_id": {
        "$oid": "5e4222f618a73cc9e6cf5889"
    },
    "username": "Nelly"
  }
]