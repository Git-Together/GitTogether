import React, { Component, PropTypes } from 'react';
import './Page.scss';
import List from '../List/List-component';
import ChatBar from '../ActiveItem/ChatBar-component';
import { connect } from 'react-redux';
import moment from 'moment'

class PageChat extends Component {
	constructor (props) {
		super(props);
		this.displayMessages = this.displayMessages.bind(this)
		this.state = {
			list: this.props.list || []
		}
	}

	static propTypes = {

	};

	componentWillMount(){}

	displayMessages(messages) {
		let textStyle = {
			fontSize: '16px'
		}
		//TODO: add timestamp
		return messages ? messages.map((messageObj, index) => {
			return <p style={textStyle} key={index}>{messageObj.author}: {messageObj.message}</p> 
		}) : []
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		const { currentUi, messages } = this.props
		return (
			<div className="ChatPage">
				<div className="ChatPage-List">
					{
						this.displayMessages(messages)
					}
				</div>
				<div className="ChatPage-Bar">
					<ChatBar />
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUi: state.ui.selected,
		messages: state.chat.messages
	}
}

export default connect(mapStateToProps)(PageChat)
