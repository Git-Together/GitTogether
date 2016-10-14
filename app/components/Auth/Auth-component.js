import React, { Component, PropTypes } from 'react'
import styles from './Auth.scss'
import * as AuthActions from '../../actions/auth-actions.js'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Promise from 'bluebird'
const storage = Promise.promisifyAll(require('electron-json-storage'))

class Login extends Component{
	constructor(props) {
		super(props)
	}

	static contextTypes = {
		router: React.PropTypes.object
	}

	componentWillMount() {
	// storage.clear(err => console.error(err));
		storage.getAsync('user')
		.then(result => {	
			this.props.dispatch(AuthActions.setUser(result.currentUser, result.token, result.id))
			if (result.currentUser) {
				this.props.dispatch(push('/Home'))
			}

		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.currentUser) {
			this.props.dispatch(push('/Home'))
		}
	}

	componentWillUpdate(){
		if (this.props.auth.currentUser) {
			this.context.router.push('/Home')
		}
	}

	render() {
		const { Auth, dispatch, login } = this.props

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
	return {
		login: bindActionCreators(AuthActions.login, dispatch),
		dispatch
	}
}

Login.propTypes = {
	auth: React.PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
