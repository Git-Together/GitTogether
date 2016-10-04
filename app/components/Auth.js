import React, { Component, PropTypes } from 'react'
import styles from './Auth.scss'

export default class Login extends Component{
	constructor(props) {
		super(props)
	}
	
	static contextTypes = {
		router: React.PropTypes.object
	}

	componentWillMount() {
		if (!this.props.authenticated) {
			this.context.router.push('/')
		}
	}

	render() {
		const { login, Auth } = this.props

		return (
			<div>	
				<button onClick={login}>Login</button>
			</div>
		)
	}
}
