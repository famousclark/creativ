import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import { Link as RouterLink } from 'react-router-dom';

import PropTypes from "prop-types";
import * as ActionCreators from '../actions/Actions';

import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  link: {
    color: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
});

class SignUpContainer extends Component {

  constructor(props : Object) {
    super(props);
    (this : any).handleRegisterUser = this.handleRegisterUser.bind(this);
    (this : any).handleEmailChange = this.handleEmailChange.bind(this);
    (this : any).handlePasswordChange = this.handlePasswordChange.bind(this);
    (this : any).MadeWithLove = this.MadeWithLove.bind(this);
    (this : any).state = {
      userInfo: {},
      allBucketsInfo: [],
      allAnnotationsInfo: [],

      registerName: "",
      registerEmail: "",
      registerPassword: ""
    };
  }

  MadeWithLove = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Built with love by the '}

        {' team.'}
      </Typography>
    );
  }

  handleRegisterUser = () => {
    this.props.registerUser({
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      roles: ['user'],
      name: this.state.registerName
    });
  }

  handleNameChange = (e) => {
   this.setState({registerName: e.target.value});
  }

  handleEmailChange = (e) => {
   this.setState({registerEmail: e.target.value});
  }

  handlePasswordChange = (e) => {
     this.setState({registerPassword: e.target.value});
  }

  render() {
    const {classes} = this.props;

    const CollisionLink = React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to="/" {...props} />
    ));

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />

          <div className={classes.paper}>

            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={this.handleNameChange}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="registerEmail"
                    label="Email Address"
                    name="registerEmail"
                    autoComplete="email"
                    onChange={this.handleEmailChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="registerPassword"
                    label="Password"
                    type="password"
                    id="registerPassword"
                    autoComplete="current-password"
                    onChange={this.handlePasswordChange}/>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleRegisterUser();
                }}
                className={classes.submit}>
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={CollisionLink} >
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>


        <Box mt={5}>
          {this.MadeWithLove()}
        </Box>

      </Container>
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(useStyles)(SignUpContainer));
