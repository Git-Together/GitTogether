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
    let item = this.props.item.name ? this.props.item.name : this.props.item
    return (
      <div className="ListItem" onClick={this.props.changeSelected.bind(null, item)}>

        <div className="ListItem-Name"> 

          <span className="ListItem-Name-Text">
            {item}
          </span> {/* ListItem-Name-Text */}

        </div> {/* ListItem-Name */}

      </div>
    )
  }
}
