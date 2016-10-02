import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repoActions from '../actions/repo'
import * as teamActions from '../actions/team'
import Home from '../components/Home';

const actionsObj = Object.assign({}, repoActions, teamActions);

function mapStateToProps(state) {
  return {
    team: state.team,
    repo: state.repo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsObj, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)





// export default class HomePage extends Component {
//   render() {
//     return (
//       <Home />
//     );
//   }
// }

