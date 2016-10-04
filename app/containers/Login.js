import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/Auth.js'
import AuthComponent from '../components/Auth.js'

class Auth extends Component {
	constructor(props) {
		super(props)
	}
}

function mapStateToProps(state) {
	return { auth : state.auth }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(AuthActions, dispatch)	
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent) 
	

