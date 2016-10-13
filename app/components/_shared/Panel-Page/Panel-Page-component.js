import React, { Component, PropTypes } from 'react';
import Panel from '../Panel/Panel-component.js';
import Page from '../Page/Page-component.js';
import PageRepo from '../Page/PageRepo-component.js';

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
    return (
      <div className="Panel-Page">
        <Panel icon={this.props.icon} currentUi={this.props.currentUi} panelMessage={this.props.panelMessage} />
        {this.props.uiSelected===this.props.currentUi && this.props.repo && <PageRepo
              list={this.props.list}
              selected={this.props.selected}
              icon={this.props.icon}
        />}

        {this.props.uiSelected===this.props.currentUi && !this.props.repo &&<Page
              list={this.props.list}
              selected={this.props.selected}
              icon={this.props.icon}
              changeSelected={this.props.changeSelected}
              addSelected={this.props.addSelected}
              removeSelected={this.props.removeSelected}
              getList = {this.props.getList}
        />}

      </div>
    )
  }
}


