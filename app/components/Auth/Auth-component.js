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
		storage.getAsync('user')
		.then(result => {
			return storage.getAsync('user')
		.then(result => {
				this.props.dispatch(AuthActions.setUser(result.currentUser, result.token, result.id))
				if (result.currentUser) {
					this.props.dispatch(push('/Home'))
				}
			})
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
			<div id="Login-loginBackground">
            <div id="Login-Header-Logo">
              <div id="Login-Header-Logo-Image">
                <span id="Login-Header-Logo-Image-Git">Git</span>
                <span id="Login-Header-Logo-Image-Together"><em>Together</em></span>
                {/* -Header-Logo */}
                <div id="Login-Header-Logo-Button" className="btn btn-primary" onClick={login}>{this.props.currentUser}
                Login
                </div>
              </div> {/* -Header-Logo-Image */}
            </div>


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
