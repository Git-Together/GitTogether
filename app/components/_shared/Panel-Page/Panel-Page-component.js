import React, { Component, PropTypes } from 'react';
import Panel from '../Panel/Panel-component.js';
import Page from '../Page/Page-component.js';
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
      <div>
        <Panel icon={this.props.icon} panelMessage={this.props.panelMessage} />
        <Page />
      </div>
    )
  }
}
