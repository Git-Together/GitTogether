import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chat from '../actions/chat-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.chat.messages,
    icon: state.chat.icon,
    panelMessage: state.chat.panelMessageArray[state.chat.panelMessagePlayIndex] || 'Your current active chat',
    panelMessageArray: state.chat.panelMessageArray,
    selected: state.chat.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'chat'
  };
	}

function mapDispatchToProps(dispatch) {
  return {
	  addSelected: bindActionCreators(chat.sendMessage, dispatch)
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     changeSelected: bindActionCreators(chat.changeActiveRepo, dispatch),
//     addSelected: bindActionCreators(chat.addChannel, dispatch),
//     removeSelected: bindActionCreators(chat.removeChannel, dispatch),
//     getList: bindActionCreators(chat.getUserRepos, dispatch)
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
// export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
