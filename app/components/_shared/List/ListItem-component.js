import React, { Component, PropTypes } from 'react';
import './ListItem.scss';

export default class List extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    console.log('List Item Props', props);
  }

  static propTypes = {

  };

  render() {
    return (
      <div className="ListItem" onClick={this.props.changeSelected}>

        <div className="ListItem-Name"> 

          <span className="ListItem-Name-Text">
            {this.props.item.name}
          </span> {/* ListItem-Name-Text */}

        </div> {/* ListItem-Name */}

      </div>
    )
  }
}
