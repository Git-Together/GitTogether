import React, {Component, PropTypes} from 'react';
import styles from './Dashboard.scss';
import Repos from './Repos.js';
import { remote } from 'electron';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import ChannelPathForm from './ChannelPathForm.js'

export default class Dashboard extends Component {
	constructor(props){
		super(props)
		this.displayFilepath = this.displayFilepath.bind(this)
	}

	displayFilepath() {
		let displayValue
		if (this.props.repo.channelName === "none") {
			displayValue = (
				<div>No channel selected.</div>
			)
		} else if (this.props.repo.channelPath) {
			displayValue = (
				<div>Current directory for {this.props.repo.channelName} is: {this.props.repo.channelPath} <br />
					<ChannelPathForm />
				</div>
			)
		} else {
			displayValue = (
				<div>No directory selected for {this.props.repo.channelName}.<br />
					<ChannelPathForm />
				</div>
			)
		}
		return displayValue
	}

	render() {
		return (
			<div>
				Dashboard
				{ this.displayFilepath() }
			</div>
		)
	};
}
