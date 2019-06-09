import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {withStyles} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Assignment from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import {TableRow, TableCell} from "@material-ui/core";

import * as ActionCreators from '../actions/Actions';

import wok from '../images/wok.jpg';
import grill from '../images/grill.jpg';
import starbucks from '../images/starbucks.jpg';
import rocky from '../images/rocky.jpg';
import pizza from '../images/pizza.jpg';
import freshens from '../images/freshens.jpg';
import dfo from '../images/dfo.jpg';
import douglass from '../images/douglass.jpg';
import Avatar from '@material-ui/core/Avatar';
import PlaceIcon from '@material-ui/icons/Place'
// import forest from '../images/forest.jpg';

import Paper from '@material-ui/core/Paper';
import Restaurant from '@material-ui/icons/Restaurant';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

var readyToLoad = false;
var readyToLoadMeals = false;
var readyToLoadReviews = false;

function TabContainer({children, dir}) {
  return (<Typography component="div" dir={dir}>
    {children}
  </Typography>);
} {/* ==============================================
  Here is where css should go, attributes use camel case (marginLeft => good, margin-left => bad)
  ==============================================*/
}
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  inline: {
    display: 'inline'
  },
  appBar: {
    top: 'auto'
  },
  details: {
    fontSize: "20px",
    color: "white"
  },
  detailHeading: {
    fontSize: "16px",
    paddingTop: "24px"
  },
  icon: {
    fontSize: 120,
    paddingTop: "50px",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto"
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  progress: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-120px",
    zIndex: 1,
    margin: theme.spacing.unit * 2
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  tabsContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  colorPrime: {
    background: "#fff"
  },
  progress: {
    margin: "45% 45%",
    color: "white",
    // margin: theme.spacing.unit * 2,
  },
  errMsg:{
    transition: "display linear 1s",
  },
  selectButton: {
    display: "block",
    marginTop: "5px",
  }
});

{/* ==============================================
  Here is where css should go, attributes use camel case (marginLeft => good, margin-left => bad)
  ==============================================*/
}

class EatContainer extends Component {

  constructor(props : Object) {
    super(props);
    (this : any).handleChange = this.handleChange.bind(this);
    (this : any).handleChangeIndex = this.handleChangeIndex.bind(this);
    (this : any).handleLoadAsync = this.handleLoadAsync.bind(this);
    (this : any).handleLoadMealsAsync = this.handleLoadMealsAsync.bind(this);
    (this : any).handleLoadReviewsAsync = this.handleLoadReviewsAsync.bind(this);
    (this : any).handleImageLoad = this.handleImageLoad.bind(this);
    (this : any).handleMenu = this.handleMenu.bind(this);
    this.state = {
      value: 0,
      allRestaurants: null,
      allMeals: null,
      isNutri: false,
      err: false
    };
  }

  decodeToken = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getLoggedInUserEmail = () => {
    var email = this.decodeToken(localStorage.getItem('token')).email;
    return email;
  }

  handleAsynchMacro = (carb, protein, fat, price) => {
    this.setState({err:true})
    return this.changeAsyncMacro(carb, protein, fat, price);
  }

  changeAsyncMacro = (carb, protein, fat, price) => new Promise((resolve, reject) => {
    var email = this.getLoggedInUserEmail();
    var c_total = this.props.userInfo.macros.total;
    var c_carb = this.props.userInfo.macros.carb;
    var c_protein = this.props.userInfo.macros.protein;
    var c_fat = this.props.userInfo.macros.fat;
    console.log(price);
    var meal_price = parseFloat(price);
    console.log(meal_price);
    var balance = parseFloat(this.props.userInfo.d_plan.balance);
    var daily_balance = parseFloat(this.props.userInfo.d_plan.daily_balance);
    var new_balance = (balance - meal_price).toFixed(2).toString();
    var new_daily_balance = (daily_balance - meal_price).toFixed(2).toString();
    console.log(new_balance);
    var new_total = c_total - (carb * 4) - (protein * 4) - (fat * 9);
    var new_carb = c_carb - (carb * 4);
    var new_protein = c_protein - (protein * 4);
    var new_fat = c_fat - (fat * 9);

    var payload = {
      email: email,
      macros: {
        total: new_total,
        fat: new_fat,
        protein: new_protein,
        carb: new_carb
      },
      d_plan: {
        plan: this.props.userInfo.d_plan.plan,
        balance: new_balance,
        daily_balance: new_daily_balance
      }
    }
    setTimeout(() => {
      this.props.editUser(payload);
    }, 1000)
    setTimeout(() => {
      this.setState({err:false})
    }, 2000)
  });

  loadAsyncRestaurantData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      this.props.getAllRestaurants();
      resolve(this.props.restaurantInfo);
    }, 1000)
  });

  loadAsyncMealsData = (r_code) => new Promise((resolve, reject) => {
    setTimeout(() => {
      this.props.getAllMealsByRestaurant(r_code);
      resolve(this.props.allMeals);
    }, 1000)
  });

  loadAsyncResetMealsData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      this.props.resetMeals();
      resolve(this.props.allMeals);
    }, 1000)
  });

  loadAsyncReviewsData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      this.props.getAllReviews();
      resolve(this.props.allReviews);
    }, 1000)
  });

  handleLoadAsync = async () => {
    this._asyncRequest = this.loadAsyncRestaurantData().then(allRestaurants => {
      this.readyToLoad = true;
      this.setState({allRestaurants});
    }).then(() => {
      setTimeout(() => {

        console.log(this.props.restaurantInfo);
        console.log(this.state.restaurantInfo);
      }, 1000)
    });
  }

  handleLoadMealsAsync = async (r_code) => {
    this._asyncRequest = this.loadAsyncMealsData(r_code).then(allMeals => {
      this.readyToLoadMeals = true;
      this.setState({allMeals});
      window.scrollTo(0, 0);
    }).then(() => {
      setTimeout(() => {

        console.log(this.props.restaurantInfo);
        console.log(this.state.restaurantInfo);
      }, 1000)
    });
  }

  handleLoadReviewsAsync = async () => {
    this._asyncRequest = this.loadAsyncReviewsData().then(allReviews => {
      this.readyToLoadReviews = true;
      this.setState({allReviews});
    }).then(() => {
      setTimeout(() => {

        console.log(this.props.restaurantInfo);
        console.log(this.state.restaurantInfo);
      }, 1000)
    });
  }

  handleResetMealsAsync = async () => {
    this._asyncRequest = this.loadAsyncResetMealsData().then(allMeals => {
      this.readyToLoadMeals = true;
      this.setState({allMeals});
    }).then(() => {
      setTimeout(() => {

        console.log(this.props.restaurantInfo);
        console.log(this.state.restaurantInfo);
      }, 1000)
    });
  }

  componentDidMount() {
    this.handleLoadAsync();
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  handleRest = () => {
    this.handleResetMealsAsync();
  }

  handleImageLoad = (image_name) => {
    var image = "";
    switch (image_name) {
      case "Wok on Up":
        image = wok;
        break;

      case "The Grill":
        image = grill;
        break;

      case "Starbucks":
        image = starbucks;
        break;

      case "Rocky's Sub Shop":
        image = rocky;
        break;

      case "Pizza Pi":
        image = pizza;
        break;

      case "Freshens":
        image = freshens;
        break;

      case "Douglass":
        image = douglass;
        break;

      case "Danforth Dining":
        image = dfo;
        break;

      default:
        image = wok;
    }
    return image
  }

  handleMenu = (r_code) => {
    this.handleLoadMealsAsync(r_code);
  }

  handleShowReviews = () => {
    this.handleLoadReviewsAsync();
  }

  render() {
    const {
      classes,
      theme,
      dir,
      open,
      allRestaurants,
      allMeals,
      userInfo
    } = this.props;
    var { err } = this.state

    const screenHeight = window.innerHeight - 56 * 2;
    var meals = "";
    var errMsg = "";
    if(err){
      errMsg = "we have updated your macros and balance!";
    } else {
      errMsg = "";
    }

    if (this.readyToLoad && allRestaurants != null) {

      console.log(allRestaurants);
      console.log(allMeals);

      if (this.readyToLoadMeals && (allMeals.length > 0)) {
        console.log(allMeals);
        meals = (
          <div>
          <div style={{padding: 30}}></div>
          {allMeals.map( meal => (
            <div key={meal._id}>
            <ExpansionPanel>
            {/*
            price: "6.99"
            allergens: ["peanut"]
            description: ""
            diet_restrinctions: []
            calories: 450
            calories_fat: 30
            carbs: {total: 20, fiber: 0, sugars: 28}
            cholesterol: 60
            fat: {total: 10, saturated: 2, trans: 2}
            proteins: 10
            sodium: 270 */}
           <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
              {meal.name} <span style={{fontStyle: "italic"}}>({meal.nutrition.calories} cal)</span>
              </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography
              style={{width:"100%"}}>
                  Allergens: {meal.allergens.map(allergen => (<span>{allergen} </span>))} <br/>
                  Dietary Resitrictions: {meal.diet_restrinctions.map( rest => (<span>{rest} </span>))} <br/>
                  Proteins: {meal.nutrition.proteins} gms, <br/>
                  Carbs: {meal.nutrition.carbs.total} gms, <br/>
                  Sugars: {meal.nutrition.carbs.total} gms, <br/>
                  Sodium: {meal.nutrition.sodium} gms <br/>
                  <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  className={classes.selectButton}
                  onClick={() => this.handleAsynchMacro(meal.nutrition.carbs.total,meal.nutrition.fat.total ,meal.nutrition.proteins, meal.price)}>
                  I ate this!
                </Button>
                <span classname={classes.errMsg} style={{color:"red"}}>{errMsg}</span>
                </Typography>
              </ExpansionPanelDetails>
          </ExpansionPanel>
            </div>

            // end map
            ))}
          </div>
        );

      }

      var listItems = allRestaurants.map(item => (<Grid key={item._id} item="item" xs={12} sm={6} style={{padding: 8}}>
        <Typography align="center" variant="body1" style={{paddingLeft: "20px", paddingRight: "20px"}}>
          <Card className={classes.card}>
            <CardActionArea onClick={() => this.handleMenu(item.r_code)}>
              {/* <CardMedia className={classes.media} image={this.handleImageLoad(item.name)} title="Contemplative Reptile"/> */}
              <CardContent>
                <Table>
                  <TableRow>
                    <TableCell style={{padding: 0}}>
                    <Avatar alt="Remy Sharp" src={this.handleImageLoad(item.name)} style={{width: 100, height: 100,}} />
                    </TableCell>
                    <TableCell style={{padding: 0, textAlign:"center"}}>
                    <Typography variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="caption">
                <PlaceIcon style={{height:16}}/>{item.location}
                </Typography>
                {/* <Typography component="p">
                  Type: {item.type}
                </Typography> */}
                {/* <Typography variant="caption">
                  Campus: {item.campus}
                </Typography> */}

                    </TableCell>
                  </TableRow>
                </Table>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
              <Button size="small" color="primary" onClick={() => this.handleMenu(item.r_code)}>
                Menu
              </Button> */}
              {/*
                <Button size="small" color="primary">
                  Review
                </Button>
                */
              }
            {/* </CardActions> */}
          </Card>
        </Typography>
      </Grid>));

      var section = (<section className={classes.content}>
        <div style={{
            flexGrow: 1,
            background: "linear-gradient(rgba(135, 206, 207,1), rgba(233, 177, 237, 0.8))",
            minHeight: ('' + window.innerHeight + 'px')
          }}>
          {
            (allMeals.length > 0)
              ? meals
              : <Grid container="container" spacing={24}>
              <div style={{padding:30}}></div>
                  {listItems}
                </Grid>
          }
        </div>
      </section>);
    } else {

      var section = (<div style={{
        background: "linear-gradient(rgba(135, 206, 207,1), rgba(233, 177, 237, 0.8))",
          minHeight: ('' + window.innerHeight + 'px')
        }}>
        <div>
          <CircularProgress className={classes.progress}/>
        </div>
      </div>);
    }

    return (<TabContainer className={classes.root} dir={dir}>
      <AppBar position="fixed" color="primary" elevation="0" classes={{
          colorPrimary: classes.colorPrime
        }} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <Typography align="center" variant="h6" style={{
              padding: "12px",
              marginTop: "15px"
            }}>
            UR EATS
          </Typography>
          {
            (allMeals.length > 0)
              ? <IconButton color="primary" onClick={() => this.handleRest()}>
                  <ArrowBack/>
                </IconButton>
              : <IconButton color="primary" onClick={() => this.handleShowReviews()}>
                  <Assignment/>
                </IconButton>
          }
        </Toolbar>
      </AppBar>
      <div style={{padding:20}}></div>
      {section}
      <div style={{padding:20}}></div>
    </TabContainer>);
  }
}

function mapStateToProps(state) {
  return {userInfo: state.app.userInfo, mealInfo: state.app.mealInfo, allRestaurants: state.app.allRestaurants, allMeals: state.app.allMeals, allReviews: state.app.allReviews}
}

function mapActionCreatorsToProps(dispatch : Object) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(styles, {withTheme: true})(EatContainer));
