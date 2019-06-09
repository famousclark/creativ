// React
import React, { Component } from "react";

// React-redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// history
import history from "../utils/history";

import * as AppActions from "../constants/actions";

// React-Router
import { Router, Route } from "react-router-dom";

import LoginContainer from "./LoginContainer";

export class RouterContainer extends Component {
  _element = React.createElement;

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <LoginContainer {...props} />} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state, ownProps): Object {
  return {
    users: state.users
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapActionCreatorsToProps, mapStateToProps)(RouterContainer);
