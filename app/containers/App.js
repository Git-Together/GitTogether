import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron'
import * as authActions from '../actions/auth'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };


	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
