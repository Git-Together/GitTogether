import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repo from '../actions/repo-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps( state, ownProps = {repo:true} ) {
  return {
    repo: ownProps.repo,
    list: state.repo.repoList,
    icon: state.repo.icon,
    panelMessage: state.repo.panelMessageArray[state.repo.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.repo.panelMessageArray,
    selected: state.repo.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'repo',
    state: state.repo,
    isRepo: true
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

