import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as watch from '../actions/watch-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    watch: state.watch,
    icon: state.watch.icon,
    panelMessage: state.watch.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(watch, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
