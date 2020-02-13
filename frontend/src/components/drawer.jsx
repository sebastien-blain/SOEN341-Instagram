import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SearchPage from './search/searchPage';
import VerticalLinearStepper from './postImage/uploadPage';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  loginPage:{
    flex:1,
    textAlign:'center',
    backgroundColor: 'white',
  },
  imageWithText:{
    fontFamily:'Arial',
  },
  first:{
    position:'absolute',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loggedin, setLoggedin] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const login = () => {
    setLoggedin(!loggedin);
  };

  if( loggedin ) {
  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:'black'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Panda
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Home' >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItem>
          </Link>
          <Link to='/upload' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Upload'>
              <ListItemIcon><CameraAltIcon /></ListItemIcon>
              <ListItemText primary='Upload'/>
            </ListItem>
          </Link>
          <Link to='/search' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Search'>
              <ListItemIcon><PersonAddIcon /></ListItemIcon>
              <ListItemText primary='Search'/>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to='/account' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Account'>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary='Account'/>
            </ListItem>
          </Link>
          <ListItem button key='Logout' onClick={login}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary='Logout'/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/search' component={SearchPage}/>
              <Route path='/upload' component={VerticalLinearStepper}/>
              <Route path='/account' component={Account}/>
            </Switch>
      </main>
    </div>
    </Router>
  );
  }
  else {
    return (
      
      <form className={classes.loginPage} noValidate autoComplete="off">
       
       <div className={classes.imageWithText}>
        <img src="/panda.jpg" alt="" ></img>
        </div>
        <TextField label="Username" variant="filled" />
        <div><TextField label="Password" type="password" variant="filled"/> </div>
        <button onClick={login}>Login</button>

      </form>
      
    );
  }
}

class Home extends Component {
  render() {
    return (

      <Typography variant="h6" noWrap>
          Home Page
      </Typography>
    );
  }
}

class Account extends Component {
  render() {
    return (
      <Typography variant="h6" noWrap>
          Account Page
      </Typography>
    );
  }
}