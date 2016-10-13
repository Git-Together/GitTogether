import React, { Component, PropTypes } from 'react';
import './Panel.scss';
import PathChoose from './PathChoose/PathChoose.js';

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
      <div className="Panel-Base">
        <div className="Panel">
          <div className="Panel-Message-Heading">
            <span className="pull-left" > <span className={this.props.icon + ' Panel-Icon '}></span>{this.props.currentUi.toUpperCase()}
            </span>
          </div>
        </div>
        <hr />
        {
          !this.props.isRepo &&
            <div className="Panel-Message">
              <div className='Panel-Message-Label'>
                {this.props.panelMessage.label}
              </div>
              <div className='Panel-Message-Text'>
                {this.props.panelMessage.text}
              </div>
            </div>
        }
        {
          this.props.isRepo &&
          <div>
            <PathChoose repo={this.props.state} />
          </div>
        }
      </div>
    )
  }
}
