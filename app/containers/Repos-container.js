import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repos from '../actions/repos-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  console.log("map repo statetoprops", state)
  return {
    list: state.repos.repos,
    icon: state.repos.icon,
    panelMessage: state.repos.panelMessageArray[state.repos.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.repos.panelMessageArray,
    selected: state.repos.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'repos'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelected: bindActionCreators(repos.changeActiveRepo, dispatch),
    addSelected: bindActionCreators(repos.addChannel, dispatch),
    removeSelected: bindActionCreators(repos.removeChannel, dispatch),
    getList: bindActionCreators(repos.getUserRepos, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
