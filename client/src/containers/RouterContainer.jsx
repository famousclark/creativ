// React
import React, { Component } from "react";

// React-redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// history
import history from "../utils/history";

import * as ActionCreators from '../actions/Actions';

// React-Router
import { Router, Route, Redirect } from "react-router-dom";

import SignUpContainer from "./SignUpContainer";
import LoginContainer from "./LoginContainer";
import Paperbase from "./Paperbase";

export class RouterContainer extends Component {
  _element = React.createElement;

  componentDidMount = () => {
    //this.props.authorizeFlow();
  }

  render() {
    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        this.props.userInfo.auth === true
        ? <Component {...props}/>
        : <Redirect to='/'/>
      )}/>
    );

    return (
      <Router history={history}>
        <div>
          <Route path="/" exact render={(props) => <LoginContainer {...props} />} />
          <Route path="/signup" exact render={(props) => <SignUpContainer {...props} />} />
          <PrivateRoute path="/dashboard" component={Paperbase}/>
        </div>
      </Router>
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(RouterContainer);
