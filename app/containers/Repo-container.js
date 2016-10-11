import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repo from '../actions/repo-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.repo.repoList,
    icon: state.repos.icon,
    panelMessage: state.repo.panelMessageArray[state.repo.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.repo.panelMessageArray,
    selected: state.repo.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'repo'
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     changeSelected: bindActionCreators(repo.changeActiveRepo, dispatch),
//     addSelected: bindActionCreators(repo.addChannel, dispatch),
//     removeSelected: bindActionCreators(repo.removeChannel, dispatch),
//     getList: bindActionCreators(repo.getUserRepos, dispatch)
//   }
// }

export default connect(mapStateToProps)(PanelPage)
// export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)

