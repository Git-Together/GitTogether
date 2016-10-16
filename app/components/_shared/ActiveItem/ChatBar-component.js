import React, { Component, PropTypes } from 'react';
import Table from 'rc-table';
import { connect } from 'react-redux'
import './ActiveItem.scss';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {

  };

	render() {
		let buttonStyle = {
			textAlign: 'center',
			fontSize: '16px'
		}
		return (
			<div className="ActiveItem">

				<input className="ChatField" />
				<div className="ChatBar-Functionality">

					<div style={buttonStyle}
						className="ActiveItem-Functionality-Add">
						Send
					</div> {/* ActiveItem-Functionality-Add */}


				</div>{/* ActiveItem-Functionality */}


			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
	}
}


export default connect()(ChatBar)
