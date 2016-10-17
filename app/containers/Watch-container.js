import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as watch from '../actions/watch-actions.js';
import * as ui from '../actions/ui-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.watch.watch,
    icon: state.watch.icon,
    panelMessage: state.watch.panelMessageArray[state.watch.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.watch.panelMessageArray,
    selected: state.watch.activeWatch,
    channelName: state.repo.channelName,
    uiSelected: state.ui.selected,
    currentUi: 'watch',
    activeUi: state.ui.activeUi
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSelected: bindActionCreators(watch.changeActiveWatchAsync, dispatch),
    toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
    addSelected: bindActionCreators(watch.watchFile, dispatch),
    removeSelected: bindActionCreators(watch.unwatchFile, dispatch),
    getList: bindActionCreators(watch.getWatch, dispatch)
  }
}


// export default connect(mapStateToProps)(PanelPage)
export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
