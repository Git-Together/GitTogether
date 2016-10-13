import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ui from '../actions/ui-actions.js';
import * as AuthActions from '../actions/auth-actions.js';
import Home from '../components/Home/Home-component.js';

function mapStateToProps(state) {
	return {
		ui: state.ui,
		auth: state.auth,
		repo: state.repo,
		state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
		logout: bindActionCreators(AuthActions.logout, dispatch),
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
