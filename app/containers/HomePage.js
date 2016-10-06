import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as repoActions from '../actions/repo';
import * as teamActions from '../actions/team';
import * as ui from '../actions/ui';
import * as settingsActions from '../actions/settings';
import * as filesActions from '../actions/files';
import * as branchActions from '../actions/branch';
import * as conventionActions from '../actions/conventions';
import * as chatActions from '../actions/chat';
import * as authActions from '../actions/auth';
import * as channelActions from '../actions/channels';
import Home from '../components/Home';

const actionsObj = Object.assign({}, repoActions, authActions, teamActions, ui, settingsActions, filesActions, branchActions, conventionActions, chatActions, channelActions);

function mapStateToProps(state) {
  return {
    channels: state.channels,
    chat: state.chat,
    team: state.team,
    repo: state.repo,
    settings: state.settings,
    conventions: state.conventions,
    files: state.files,
    branches: state.branches,
	  ui: state.ui,
	  auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsObj, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
