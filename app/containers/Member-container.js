import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as member from '../actions/member-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';

function mapStateToProps(state) {
  return {
    member: state.member,
    icon: state.member.icon,
    panelMessage: state.member.panelMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(member, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
