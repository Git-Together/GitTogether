import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repos from '../actions/repos-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    repos: state.repos,
    icon: state.repos.icon,
    panelMessage: state.repos.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repos, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
