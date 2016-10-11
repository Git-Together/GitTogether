import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repo from '../actions/repo-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    repo: state.repo,
    icon: state.repo.icon,
    panelMessage: state.repo.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repo, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
