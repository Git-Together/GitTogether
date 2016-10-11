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
      <div className="ActiveItem">
        TEST TEST TEST
        <div className="ActiveItem-Name">

          <div className="ActiveItem-Name-Text">
            {this.props.activeItem.name}
          </div> {/* ActiveItem-Name-Text */}

        </div> {/* ActiveItem-Name */}

        <div className="ActiveItem-Details">

          <div className="ActiveItem-Details-Content">
            {this.props.activeItem.details}
          </div> {/* ActiveItem-Details-Content */}
          
        </div>{/* ActiveItem-Details */}

        <div className="ActiveItem-Functionality">

          <div 
            onClick={this.props.addSelected}
            className="ActiveItem-Functionality-Add">
          </div> {/* ActiveItem-Functionality-Add */}
          <div 
            onClick={this.props.removeSelected}
            className="ActiveItem-Functionality-Remove">
          </div> {/* ActiveItem-Functionality-Remove */}

        </div>{/* ActiveItem-Functionality */}

        <div className="ActiveItem-MainView">

          <div className="ActiveItem-MainView-Content">
            {this.props.activeItem.mainView}
          </div> {/* ActiveItem-Name-MainView-Content */}

        </div>{/* ActiveItem-MainView */}
      
      </div>
    )
  }
}
