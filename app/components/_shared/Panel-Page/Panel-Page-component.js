import React, { Component, PropTypes } from 'react';
import Panel from '../Panel/Panel-component.js';
import Page from '../Page/Page-component.js';
import PageRepo from '../Page/PageRepo-component.js';
import PageChat from '../Page/PageChat-component.js';

import './Panel-Page.scss';

export default class PanelPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {

  };

  render() {
	  let isChat = this.props.uiSelected === "chat"
    return (
		<div className="Panel-Page">
			<Panel icon={this.props.icon} state={this.props.state} currentUi={this.props.currentUi} isRepo={this.props.isRepo} panelMessage={this.props.panelMessage} />
			{this.props.uiSelected===this.props.currentUi && this.props.isRepo && <PageRepo
				list={this.props.list}
				selected={this.props.selected}
				icon={this.props.icon}
			/>}

			{this.props.uiSelected===this.props.currentUi && isChat && <PageChat
				selected={this.props.selected}
				icon={this.props.icon}
			/>}

			{this.props.uiSelected===this.props.currentUi && !isChat && <Page
				list={this.props.list}
				selected={this.props.selected}
				icon={this.props.icon}
				changeSelected={this.props.changeSelected}
				addSelected={this.props.addSelected}
				removeSelected={this.props.removeSelected}
				getList = {this.props.getList}
				channelName = {this.props.channelName}
			/>}

	</div>
	)
  }
}


