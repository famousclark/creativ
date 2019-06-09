import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Restaurant from '@material-ui/icons/Restaurant';
import Table from '@material-ui/core/Table';
import { TableRow, TableCell } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import * as ActionCreators from '../actions/Actions';

var readyToLoad = false;

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',

  },
  icon: {
    fontSize: 120,
    paddingTop: "50px",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto"
  },
  progress: {
    margin: "45% 45%",
    color: "white",
    // margin: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  tabsContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto"
  },
  details: {
    fontSize : "20px",
    color: "white",
  },
  detailHeading:{
    fontSize: "16px",
    paddingTop: "24px",
  },
  colorPrime:{
    background: "#fff"
  }

});

class BudgetContainer extends Component {

  readyToLoad = false;

  constructor(props){
    super(props);
    // (this : any).handleChange = this.handleChange.bind(this);
    // (this : any).handleChangeIndex = this.handleChangeIndex.bind(this);
    (this : any).handleLoadAsync = this.handleLoadAsync.bind(this);

      this.state = {
        userInfo: null,
        isLoading: true
      };
  }

  decodeToken  = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getLoggedInUserEmail = () =>{
    var email = this.decodeToken(localStorage.getItem('token')).email;
    return email;
  }

  loadAsyncRestaurantData = () =>  new Promise( (resolve, reject) => {
    setTimeout( () => {
      this.props.getAllRestaurants();
      resolve(this.props.restaurantInfo);
    }, 1000)
  });

  loadAsyncUserData = (userEmail) =>  new Promise( (resolve, reject) => {
    setTimeout( () => {
      this.props.getUser(userEmail);
      resolve(this.props.userInfo);
    }, 1000)
  });

  loadAsyncMealData = (userEmail) =>  new Promise( (resolve, reject) => {
    setTimeout( () => {
      this.props.getMeal(userEmail);
      resolve(this.props.userInfo);
    }, 1000)
  });

  handleLoadAsync = async () => {
    this._asyncRequest = this.loadAsyncUserData( this.getLoggedInUserEmail())
    .then(
      userInfo => {
        this.readyToLoad = true;
        this.setState({userInfo});
      }
    )
    /*
    this._asyncRequest = null;
    this._asyncRequest = this.loadAsyncRestaurantData()
    .then(
      userInfo => {
        this.readyToLoad = true;
        this.setState({userInfo});
      }
    )
    */
  };

  componentDidMount() {
    this.handleLoadAsync();
    this.state.isLoading = false;
  }

  mainPage(){

  }

  render(){
    const { classes, theme, dir, open, userInfo, isLoading} = this.props;
    //const { userInfo } = this.props;
    const screenHeight = window.innerHeight - 56*2;
    if (!isLoading && userInfo.d_plan != null) {

      var MealPlan = '';
      var swipes ='';
      if(userInfo.d_plan.plan == "MelUlm"){
        MealPlan =(<div>Meliora Unlimited</div>)
        swipes = (<div>Unlimited</div>)
      } else if(userInfo.d_plan.plan == "BlueUlm"){
        MealPlan =(<div>Blue Unlimited</div>)
        swipes = (<div>Unlimited</div>)
      } else if(userInfo.d_plan.plan == "150Pass"){
        MealPlan =(<div>150 Pass Plan</div>)
        swipes = (<div>150</div>)
      } else if(userInfo.d_plan.plan == "OptionA"){
        MealPlan =(<div>Option A Declining</div>)
        swipes = (<div>0</div>)
      } else if(userInfo.d_plan.plan == "OpionB"){
        MealPlan =(<div>Option B Declining</div>)
        swipes = (<div>0</div>)
      } else if(userInfo.d_plan.plan == "OptionC"){
        MealPlan =(<div>Option C Declining</div>)
        swipes = (<div>0</div>)
      } else if(userInfo.d_plan.plan == "OpionD"){
        MealPlan =(<div>Option D Declining</div>)
        swipes = (<div>0</div>)
      } else if(userInfo.d_plan.plan == "Com"){
        MealPlan =(<div>Commuter Plan</div>)
        swipes = (<div>0</div>)
      }

      var section = (
        <section className={classes.content}>
        <div style={{background: "linear-gradient(rgba(135, 206, 207,1), rgba(233, 177, 237, 0.8))", minHeight:('' + screenHeight+'px')}}>
          <Typography align="center" variant="body1" style={{padding: "40px" }}>
            Declining Left to Spend Today:
            <Typography align="center" variant="h2" style={{ padding: "24px" }}>
            ${userInfo.d_plan.daily_balance}
            </Typography>
          </Typography>

          <Typography align="center" style={{ padding: "24px" }}>
              You are doing great, {userInfo.name}. Keep up UR healthy eats
          </Typography>

          <Table className={classes.table}>
            <TableRow>
              <TableCell style={{padding: "0px 0px 20px 20px"}}>
              <div className={classes.detailHeading}>
                Meal Plan
                <div className={classes.details}>{MealPlan}</div>
              </div>
              </TableCell>
              <TableCell style={{padding: "0px 0px 20px 20px"}}>
                <div className={classes.detailHeading}>
                Daily Budget
                <div className={classes.details}> 30.00 </div>
                </div>

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{padding: "0px 0px 20px 20px"}}>
                <div className={classes.detailHeading}>
              Declining
               <div className={classes.details}>
                {userInfo.d_plan.balance}
               </div>
               </div>
              </TableCell>
              <TableCell style={{padding: "0px 0px 20px 20px"}}>
                <div className={classes.detailHeading}>
                Swipes
                <div className={classes.details}> {swipes}</div>
                </div>
              </TableCell>
            </TableRow>
          </Table>
          </div>
        </section> )
    }else{
      var section = (
        <div style={{background: "linear-gradient(rgba(135, 206, 207,1), rgba(233, 177, 237, 0.8))", minHeight:('' + screenHeight+'px')}}>
          <div>
            <CircularProgress className={classes.progress} />
           </div>
        </div>
      );
  }

      //console.log("today " + today + " expires " + expiry);
      return(
        <TabContainer className={classes.root} dir={dir}>
          <AppBar
            position="static"
            color="primary"
            elevation="0"
            classes={{
              colorPrimary: classes.colorPrime
            }}
            className={classes.appBar}>
            <Typography
              align="center"
              variant="h6"
              style={{ padding: "12px" }}>
                UR EATS
            </Typography>
          </AppBar>
          {section}
          <div style={{padding:20}}></div>
          </TabContainer>
        );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.app.userInfo,
    mealInfo: state.app.mealInfo,
    restaurantInfo: state.app.restaurantInfo
  }
}

function mapActionCreatorsToProps(dispatch: Object) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(styles,{ withTheme: true })(BudgetContainer));
