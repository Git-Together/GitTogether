import React, { Component, PropTypes } from 'react';
import './List.scss';
import ListItem from './ListItem-component.js'

export default class List extends Component {
  constructor (props) {
    //Passed down in props
    super(props);
    this.state = {

    }
    this.display = this.display.bind(this);
  }

  static propTypes = {

  };

  display(){
    return this.props.list? this.props.list.map((e, index) => {
      return <ListItem key={index} item={e} changeSelected={this.props.changeSelected}/>
    }) : [];
  }

  render() {
    return (
      <div className="ListComponent">{this.display()}</div>
    )
  }
}
