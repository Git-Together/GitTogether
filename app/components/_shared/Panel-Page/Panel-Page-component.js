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
    console.log("this.props from PanelPage", this.props)
    return (
      <div className="Panel-Page">
        {this.props.uiSelected===this.props.currentUi &&<Page
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

{/*<Panel icon={this.props.icon} panelMessage={this.props.panelMessage} /> */}
