import React, { Component, PropTypes } from 'react';
import './Page.scss';
import List from '../List/List-component';
import ChatBar from '../ActiveItem/ChatBar-component';
import { connect } from 'react-redux';

class PageChat extends Component {
	constructor (props) {
		super(props);
		this.state = {
			list: this.props.list || []
		}
	}

	static propTypes = {

	};

	componentWillMount(){}

	componentWillReceiveProps(nextProps) {}


	render() {
		const { currentUi, messages } = this.props
		return (
			<div className="ChatPage">
				<div className="ChatPage-List">
					hey
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
