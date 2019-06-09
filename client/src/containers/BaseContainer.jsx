//this is the old code for the login container in case hell brakes loose

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableViews from 'react-swipeable-views';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Fab from '@material-ui/core/Fab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BudgetIcon from '@material-ui/icons/Assessment'
import EatIcon from '@material-ui/icons/Restaurant';
import CommunityIcon from '@material-ui/icons/People'
import ProfileIcon from '@material-ui/icons/Person'
import LogOutIcon from '@material-ui/icons/ExitToApp'

import BudgetContainer from './BudgetContainer';
import EatContainer from './EatContainer';
import CommunityContainer from './CommunityContainer';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
     marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
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
    flexShrink: 0,
  },
  drawerPaper: {
    background: "rgba(0,0,0,.5)",
    width: drawerWidth,
  },
  drawerHeader: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
    justifyContent: 'flex-end',
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
  icon: {
    fontSize: 180,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class LoginContainer extends Component {

  constructor(props: Object){
    super(props);
    (this : any).handleChange = this.handleChange.bind(this);
    (this : any).handleChangeIndex = this.handleChangeIndex.bind(this);
    (this : any).handleDrawerOpen = this.handleDrawerOpen.bind(this);
    (this : any).handleDrawerClose = this.handleDrawerClose.bind(this);
    (this : any)
      .state = {
        value: 0,
        open: false,
        wide: false,
        isLoggedIn: false,
      };

  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false, wide: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { open, value } = this.state;

    // const drawer = (
    //   <div>
    //     <div className={classes.topper} />
    //     <List>
    //       {['Eat', 'Budget', 'Community'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon style={{color: "#fff" }} >
    //           {index == 1 ? <BudgetIcon /> : index == 0 ? <EatIcon/> : <CommunityIcon/>}
    //           </ListItemIcon>
    //           <ListItemText
    //             disableTypography={false}
    //             primaryTypographyProps={{
    //               classes: {colorPrimary: classes.colorPrimary},
    //               color: "primary"
    //             }}

    //             primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider style={{backgroundColor: "rgba(255, 255, 255, .12)"}}/>
    //     <List>
    //       {['My Profile', 'Log Out'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon style={{color: "#fff" }} >{index % 2 === 0 ? <ProfileIcon /> : <LogOutIcon />}</ListItemIcon>
    //           <ListItemText
    //             disableTypography={false}
    //             primaryTypographyProps={{
    //               classes: {colorPrimary: classes.colorPrimary},
    //               color: "primary"
    //             }}
    //             primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider style={{backgroundColor: "rgba(255, 255, 255, .12)"}}/>
    //     <div style={{background: "#DDD"}} className={classes.fabHolder}>
    //       <Fab onClick={this.handleDrawerClose} color="primary" aria-label="Add" className={classes.fabButton}>
    //         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    //       </Fab>
    //     </div>
    //   </div>
    // );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open && !(theme.breakpoints.up('sm'))
          })}>
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Tabs
              style={{flexGrow: "1"}}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered>
              <Tab label="Budget" />
              <Tab label="Eat" />
              <Tab label="Community" />
            </Tabs>
          </Toolbar>
        </AppBar>

        {/* <nav  className={classes.drawer}> */}
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {/* <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              cvariant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}>
              {drawer}
            </Drawer>
          </Hidden> */}
        {/* </nav> */}

        {/*<Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          {drawer}
        </Drawer>*/}

        <main
          className={classNames(classes.content, {[classes.contentShift]: open && !(theme.breakpoints.up('sm'))})}>
          {/*<div className={classes.drawerHeader} />*/}
          {/*<SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}>*/}
            {value === 0 &&<BudgetContainer open={open} dir={theme.direction}/>}
            {value === 1 &&<EatContainer open={open} dir={theme.direction}/>}
            {value === 2 &&<CommunityContainer open={open} dir={theme.direction}/>}
          {/*</SwipeableViews>*/}
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BaseContainer);
