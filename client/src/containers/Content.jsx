import React from 'react';
import PropTypes from 'prop-types';

// React-redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppActions from "../constants/actions";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Sortable from 'react-sortablejs';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import uniqueId from 'lodash/uniqueId';

const useStyles = theme => ({
  paper: {
    marginBottom: "2rem",
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  listRoot: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 580
  },
  sortableMargin: {
    marginBottom: '1rem'
  }
});

class Content extends React.Component {

  state = {
    sortables: ["test test test test test test tets test tets test tets tte tst stts sttst", 'test', 'test'],
    groupOne: [
      'Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry',
      'Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry',
      'Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry'
    ],
    groupTwo: ['cherry'],
    groupThree: ['apple'],
    groupFour: ['apple'],
    groupFive: ['apple'],
    groupSix: ['apple'],
    groupSeven: ['apple'],
    groupEight: ['apple'],
    groupNine: ['apple'],
    items: this.props.allBucketsInfo
  };

  componentDidMount = () => {
    console.log(this.state);
  }

  render() {

    const sortables = this.state.sortables.map(val => (<ListItem key={uniqueId()} data-id={val}>{val}</ListItem>));

    const {classes} = this.props
    const indexs = ['groupOne', 'groupTwo', 'groupThree', 'groupFour', 'groupFive', 'groupSix', 'groupSeven', 'groupEight', 'groupNine'];

    const list = this.props.allBucketsInfo.buckets.map(name =>
      <Paper key={name.catagory} className={classes.sortableMargin}>
        <ListSubheader>{name.catagory}</ListSubheader>
        <Sortable
          component={List}
          options={{
            group: 'shared',
            pull: true,
            put: true
          }}
          onChange={(items) => {
            this.setState({ [name]: items });
          }}>
          {name.sortables.map(val => (<ListItem key={uniqueId()} data-id={val.annotation}>{val.annotation}</ListItem>))}
        </Sortable>
      </Paper>
    );

    return (
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.listRoot}>
            <ListSubheader>Sortables</ListSubheader>
            <Sortable
              component={List}
              options={{
                  group: 'shared',
                  pull: true,
                  put: false
              }}
              onChange={(items) => {
                this.setState({ sortables: items });
              }}>
              {sortables}
            </Sortable>
          </Paper>
        </Grid>
        <Grid className={classes.listRoot} item xs={12} md={8} lg={9}>
          {list}
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps): Object {
  return {
    userInfo: state.app.userInfo,
    userProfile: state.app.userProfile,
    allBucketsInfo: state.app.allBucketsInfo
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(withStyles(useStyles)(Content));
