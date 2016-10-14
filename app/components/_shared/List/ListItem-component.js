import React, { Component, PropTypes } from 'react';
import './ListItem.scss';
import { connect } from 'react-redux'
import ActiveUser from '../ActiveItem/ActiveUser-component';


import {ModalContainer, ModalDialog} from 'react-modal-dialog';


class List extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isShowingModal: false
    }
  }

  static propTypes = {

  };

  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})

  render() {
    let item;
    if(typeof this.props.item === "string"){
      item = this.props.item;
    } else {
      if(this.props.item.name){
          item = this.props.item.name;
      } else if (this.props.item.path){
        item = this.props.item.path
      }
    }
	let style = {}
	console.log("PROPS ", this.props)
	if (this.props.currentUi === "team") {
		style.backgroundColor = "red"
		style.fontSize = "30px"
	}
    return (
      <div style={style} className="ListItem" onClick={this.props.changeSelected.bind(null, item)}>

        <div className="ListItem-Name" onClick={this.handleClick}>
          {
          this.state.isShowingModal && this.props.isTeam &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Recent Activity for: {item}</h1>
              <ActiveUser name={item} addSelected={function(){}} removeSelected={function(){}}/>
            </ModalDialog>
          </ModalContainer>
        } 

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
