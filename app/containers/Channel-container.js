import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as channel from '../actions/channel-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.channel,
    icon: state.channel.icon,
    panelMessage: state.channel.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(channel, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
