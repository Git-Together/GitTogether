import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as file from '../actions/file-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    file: state.file,
    icon: state.file.icon,
    panelMessage: state.file.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(file, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
