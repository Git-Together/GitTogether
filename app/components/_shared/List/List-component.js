import React, { Component, PropTypes } from 'react';
import './List.scss';

export default class List extends Component {
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
