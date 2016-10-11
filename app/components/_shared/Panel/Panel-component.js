import React, { Component, PropTypes } from 'react';
import './Panel.scss';

export default class Panel extends Component {
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
        <div id='Panel-Icon' className={this.props.icon}></div>
        <div id='Panel-Message-Label'>
          {console.log("This.props in panel", this.props)}
          {this.props.panelMessage.label}
          }
        </div>
        <div id='Panel-Message-Text'>
          {this.props.panelMessage.text}
        </div>
      </div>
    )
  }
}
