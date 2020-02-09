import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import PersonIcon from '@material-ui/icons/Person';


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
    this.state = { classes: useStyles, allList: MockSearch, userlist: MockSearch };
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

  render() {
    return (
      <div>
        <form className={this.state.classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Search" variant="outlined" onKeyUp={this.preciseSearch}/>
        </form>
        <div style={{marginTop:'30px'}}>
          {this.state.userlist.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><PersonIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </div>
      </div>
    );
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