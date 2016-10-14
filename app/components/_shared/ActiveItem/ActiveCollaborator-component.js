import React, { Component, PropTypes } from 'react';
import './ActiveItem.scss';

export default class ActiveCollaborator extends Component {
	constructor (props) {
		super(props);
		this.state = {

		}
	}

	static propTypes = {

	};

	render() {
		let itemStyle = {
			marginLeft: '10px'
		}
		let buttonStyle = {
			textAlign: 'center',
			fontSize: '16px'
		}
		return (
			<div className="ActiveItem">

				<div className="ActiveItem-Name">

					<div style={itemStyle} className="ActiveItem-Name-Text">
						{this.props.activeItem.name}
					</div> {/* ActiveItem-Name-Text */}

				</div> {/* ActiveItem-Name */}
				{/*
		<div className="ActiveItem-Details">

		  <div className="ActiveItem-Details-Content">
			{this.props.activeItem.details}
		  </div> 

		</div>*/}
		<div className="ActiveItem-Functionality">

				<div style={buttonStyle}
					onClick={this.props.addSelected.bind(null, this.props.activeItem.name)}
					className="ActiveItem-Functionality-Add">
					Add to team
				</div> {/* ActiveItem-Functionality-Add */}

				<div style={buttonStyle}
					onClick={this.props.removeSelected.bind(null, this.props.activeItem.name)}
					className="ActiveItem-Functionality-Remove">
					Remove from team
				</div> {/* ActiveItem-Functionality-Remove */}

			</div>{/* ActiveItem-Functionality */}

			<div className="ActiveItem-MainView">

				<div className="ActiveItem-MainView-Content">
					<table>
						{/*
				{this.displayHeader()}
				{this.displayRow()} */}
			</table> 
				{this.props.activeItem.mainView}
			</div> {/* ActiveItem-Name-MainView-Content */}

		</div>{/* ActiveItem-MainView */}

	</div>
		)
	}
}
