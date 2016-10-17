import React, { Component, PropTypes } from 'react';
import Table from 'rc-table';
import { connect } from 'react-redux'
import './ActiveItem.scss';
import * as ChatActions from '../../../actions/chat-actions.js'
import { sendChat } from '../../../utils/incoming-sockets.js' 
import { bindActionCreators } from 'redux'

class ChatBar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			message: ''
		}
	}

	static propTypes = {};

	handleChange(event) {
		this.setState({ message: event.target.value })
	}

	handleSubmit(event) {
		const { currentUser, channelName, sendMessage, dispatch } = this.props
		const message = event.target.value.trim()
		if (event.which === 13) {
			let newMessage = {
				author: currentUser,
				channelName,
				message,
				timeStamp: Date.now()
			}
			sendChat(message, currentUser, channelName)
			dispatch(ChatActions.addMessage(newMessage))
			this.setState({ message: '' })
		}
	}

	render() {
		let buttonStyle = {
			textAlign: 'center',
			fontSize: '16px'
		}
		return (
			<div className="ActiveItem">

				<input 
					className="ChatField" 
					type="textarea"
					name="message"
					ref="messageComposer"
					autoFocus="true"
					placeholder="Type your message here!"
					value={this.state.message}
					onChange={::this.handleChange}
					onKeyDown={::this.handleSubmit}
				/>
				<div className="ChatBar-Functionality">

				</div>{/* ActiveItem-Functionality */}


			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.auth.currentUser,
		channelName: state.repo.channelName
	}
}

export default connect(mapStateToProps)(ChatBar)
