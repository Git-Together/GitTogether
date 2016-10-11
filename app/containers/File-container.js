import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as file from '../actions/file-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.file.file,
    icon: state.file.icon,
    panelMessage: state.file.panelMessageArray[state.file.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.file.panelMessageArray,
    selected: state.file.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'file'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelected: bindActionCreators(file.changeActiveRepo, dispatch),
    addSelected: bindActionCreators(file.addChannel, dispatch),
    removeSelected: bindActionCreators(file.removeChannel, dispatch),
    getList: bindActionCreators(file.getUserRepos, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
