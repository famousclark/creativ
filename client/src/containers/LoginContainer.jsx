import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as ActionCreators from '../actions/Actions';

import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableViews from 'react-swipeable-views';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CakeIcon from '@material-ui/icons/Cake';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BudgetIcon from '@material-ui/icons/Assessment'
import EatIcon from '@material-ui/icons/Restaurant';
import CommunityIcon from '@material-ui/icons/People'
import ProfileIcon from '@material-ui/icons/Person'
import LogOutIcon from '@material-ui/icons/ExitToApp'
import TextField from '@material-ui/core/TextField';

//import BudgetContainer from './BudgetContainer';
//import EatContainer from './EatContainer';
//import CommunityContainer from './CommunityContainer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {log} from "util";

function TabContainer({children, dir}) {
  return (<Typography component="div" dir={dir}>
    {children}
  </Typography>);
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  topper: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "rgba(135, 206, 207,.5)",
    width: drawerWidth
  },
  drawerHeader: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  fabHolder: {
    position: 'absolute',
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  colorPrimary: {
    color: "#fff"
  },
  button: {
    width: "100px",
    margin: "10px"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "195px"
  },
  icon: {
    fontSize: 180,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  logInbutton: {
    margin: "15% 22%",
    textAlign: "center"
  },
  errMsg:{
    transition: "display linear 1s",
  }
});

class LoginContainer extends Component {

  isLoggedIn = false;
  isLoggedOut =true;

  constructor(props : Object) {
    super(props);

    (this : any).state = {

    };
  }

  render() {
    return(
      <p>hello</p>
    );
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.app.userInfo,
    allBucketsInfo: state.app.allBucketsInfo,
    allAnnotationsInfo: state.app.allAnnotationsInfo
  }
}
function mapActionCreatorsToProps(dispatch : Object) {
  return bindActionCreators(ActionCreators, dispatch);
}

// const mapStateToProps = (result) => ({result});

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(styles, {withTheme: true})(LoginContainer));
