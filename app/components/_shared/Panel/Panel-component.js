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
      <div className="Panel">

        <div className={this.props.icon + ' Panel-Icon'}></div>
        <div className='Panel-Message-Label'>
          {this.props.panelMessage.label}
        </div>
        <div className='Panel-Message-Text'>
          {this.props.panelMessage.text}
        </div>
      </div>
    )
  }
}
