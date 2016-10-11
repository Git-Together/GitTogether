import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as team from '../actions/team-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    team: state.team,
    icon: state.team.icon,
    panelMessage: state.team.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(team, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
