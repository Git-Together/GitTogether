import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function authCheck(checkLogin) {
	console.log('IN AUTH CHECK UTIL')
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			console.log("LOGGING CURRENT USER" + this.props.auth.currentUser)
			if (this.props.auth.currentUser) {
				this.context.router.push('/Home')
			}
		}

		componentWillUpdate(nextProps) {
			console.log("LOGGING CURRENT USER COMPONENTWILLUPDATE" + this.props.auth.currentUser)
			if (nextProps.auth.currentUser) {
				this.context.router.push('/Home')
			}
		}
	
		render() {
			console.log("LOGGING CURRENT USER IN RENDER" + this.props.auth.currentUser)
			return <checkLogin {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { auth: state.auth }
	}

	return connect(mapStateToProps)(Authentication)
}
