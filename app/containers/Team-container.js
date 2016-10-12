import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as team from '../actions/team-actions.js';
// import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';
import ListView from '../components/_shared/List/ListView-component.js';

function mapStateToProps(state) {
  return {
    list: state.team.team,
    icon: state.team.icon,
    panelMessage: state.team.panelMessageArray[state.team.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.team.panelMessageArray,
    selected: state.team.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'team'
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(team, dispatch);
// }

function mapDispatchToProps(dispatch) {
  return {
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     changeSelected: bindActionCreators(repos.changeActiveRepo, dispatch),
//     addSelected: bindActionCreators(repos.addChannel, dispatch),
//     removeSelected: bindActionCreators(repos.removeChannel, dispatch),
//     getList: bindActionCreators(repos.getUserRepos, dispatch)
//   }
// }

export default connect(mapStateToProps)(ListView)
// export default connect(mapStateToProps, mapDispatchToProps)(List)
