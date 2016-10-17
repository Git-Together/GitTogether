import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as file from '../actions/file-actions.js';
import * as watch from '../actions/watch-actions.js'
import * as ui from '../actions/ui-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.repo.repoList,
    icon: state.file.icon,
    panelMessage: state.file.panelMessageArray[state.file.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.file.panelMessageArray,
    selected: state.file.activeFileId,
    uiSelected: state.ui.selected,
    currentUi: 'file',
    activeUi: state.ui.activeUi
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
    changeSelected: bindActionCreators(file.changeActiveFileAsync, dispatch),
	  addSelected: bindActionCreators(watch.watchFile, dispatch),
	  removeSelected: bindActionCreators(watch.unwatchFile, dispatch),
    // getList: bindActionCreators(file.refreshFiles, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
