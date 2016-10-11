import React, { Component, PropTypes } from 'react';
import './ActiveItem.scss';

export default class ActiveItem extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {

  };

  render() {
    return (
      <div>{this.props.testText}</div>
    )
  }
}
