import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chat from '../actions/chat-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    chat: state.chat,
    icon: state.chat.icon,
    panelMessage: state.chat.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(chat, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
