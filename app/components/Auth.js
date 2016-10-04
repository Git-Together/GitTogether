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
		if (!this.props.currentUser) {
			this.context.router.push('/')
		}
		console.log(this.props)
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
