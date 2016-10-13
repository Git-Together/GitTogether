import React, { Component, PropTypes } from 'react';
import './ListItem.scss';
import { connect } from 'react-redux'

class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {

  };

  render() {
    let item = this.props.item.name ? this.props.item.name : this.props.item;
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

function mapStateToProps(state) {
	return {
		currentUi: state.ui.selected
	}
}

export default connect(mapStateToProps)(List)
