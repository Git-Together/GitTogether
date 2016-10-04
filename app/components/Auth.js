import React, { Component, PropTypes } from 'react'
import styles from './Auth.scss'
import * as AuthActions from '../actions/Auth.js'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

class Login extends Component{
	constructor(props) {
		super(props)
	}
	
	static contextTypes = {
		router: React.PropTypes.object
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.currentUser) {
			this.context.router.push('/Home')
		}
	}

	render() {
		const { login, Auth } = this.props

		return (
			<div>	
				<button onClick={login}>Login</button>
				<div>{this.props.currentUser}</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { auth : state.auth }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(AuthActions, dispatch)	
}

Login.propTypes = {
	auth: React.PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
