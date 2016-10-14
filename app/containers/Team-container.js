import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as team from '../actions/team-actions.js';
import * as repo from '../actions/repo-actions.js';
// import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';
import ListView from '../components/_shared/List/ListView-component.js';

function mapStateToProps(state) {
  return {
    list: state.team.teamObj[state.team.activeTeam] || state.team.team,
    icon: state.team.icon,
    panelMessage: state.team.panelMessageArray[state.team.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.team.panelMessageArray,
    selected: state.team.activeTeam,
    uiSelected: state.ui.selected,
    currentUi: 'team'
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(team, dispatch);
// }

function mapDispatchToProps(dispatch) {
  return {
    changeSelected: bindActionCreators(team.changeActiveTeamMemberAsync, dispatch),
    getList: bindActionCreators(team.refreshTeamMembers, dispatch)
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

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
// export default connect(mapStateToProps, mapDispatchToProps)(List)
