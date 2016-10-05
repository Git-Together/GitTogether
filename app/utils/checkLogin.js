import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function authCheck(checkLogin) {
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (this.props.auth.currentUser) {
				this.context.router.push('/Home')
			}
		}

		componentWillUpdate(nextProps) {
			if (nextProps.auth.currentUser) {
				this.context.router.push('/Home')
			}
		}
	
		render() {
			return <checkLogin {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { auth: state.auth }
	}

	return connect(mapStateToProps)(Authentication)
}
