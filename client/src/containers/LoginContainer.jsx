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

class LoginContainer extends Component {

  constructor(props : Object) {
    super(props);
    (this : any).handleSignInUser = this.handleSignInUser.bind(this);
    (this : any).handleEmailChange = this.handleEmailChange.bind(this);
    (this : any).handlePasswordChange = this.handlePasswordChange.bind(this);
    (this : any).MadeWithLove = this.MadeWithLove.bind(this);
    (this : any).state = {
      userInfo: {},
      allBucketsInfo: [],
      allAnnotationsInfo: [],

      loginEmail: "",
      loginPassword: ""
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

  handleSignInUser = () => {
    this.props.signInUser({
      email: this.state.loginEmail,
      password: this.state.loginPassword
    });
  }

  handleEmailChange = (e) => {
   this.setState({loginEmail: e.target.value});
  }

  handlePasswordChange = (e) => {
     this.setState({loginPassword: e.target.value});
  }

  render() {
    const {classes} = this.props;

    const CollisionLink = React.forwardRef((props, ref) => (
      <RouterLink innerRef={ref} to="/signup" {...props} />
    ));

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="loginEmail"
                label="Email Address"
                name="loginEmail"
                autoComplete="email"
                autoFocus
                onChange={this.handleEmailChange}/>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="loginPassword"
                label="loginPassword"
                type="password"
                id="loginPassword"
                autoComplete="current-password"
                onChange={this.handlePasswordChange}/>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleSignInUser();
                }}
                className={classes.submit}>
                Sign In
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={CollisionLink} >
                    {"Don't have an account? Sign Up"}
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(useStyles)(LoginContainer));
