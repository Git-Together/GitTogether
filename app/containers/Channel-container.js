import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as channel from '../actions/channel-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    list: state.channel, //Page List
    icon: state.channel.icon, //Page Icon
    panelMessage: state.channel.panelMessage //Message List
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(channel, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
