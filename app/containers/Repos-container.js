import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repos from '../actions/repos-actions.js';
import * as ui from '../actions/ui-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.repos.repos,
    icon: state.repos.icon,
    panelMessage: state.repos.panelMessageArray[state.repos.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.repos.panelMessageArray,
    selected: state.repos.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'repos',
    activeUi: state.ui.activeUi
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
    changeSelected: bindActionCreators(repos.changeActiveRepo, dispatch),
    addSelected: bindActionCreators(repos.addChannel, dispatch),
    removeSelected: bindActionCreators(repos.removeChannel, dispatch),
    getList: bindActionCreators(repos.getUserRepos, dispatch)
  }
}

// export default connect(mapStateToProps)(PanelPage)
export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
