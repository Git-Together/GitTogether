import React, { Component, PropTypes } from 'react';
import './ListItem.scss';
import { connect } from 'react-redux'
import ActiveUser from '../ActiveItem/ActiveUser-component';
import ActiveRepo from '../ActiveItem/ActiveRepo-component';
import * as ChannelActions from '../../../actions/repos-actions.js'
import { bindActionCreators } from 'redux'


import { ModalContainer, ModalDialog } from 'react-modal-dialog';


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
	let { removeChannel } = this.props
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
	removeChannel = removeChannel.bind(null, item)
	let itemStyle = {
		cursor: 'pointer'
	}
	
    return (
      <div className="ListItem" style={itemStyle} onClick={this.props.changeSelected.bind(null, item)}>

        <div className="ListItem-Name" onClick={this.props.curUi === "team" && this.handleClick}>
          {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Recent Activity for: {item}</h1>
              { this.props.curUi === 'team' && <ActiveUser name={item} addSelected={function(){}} removeSelected={function(){}}/> }
              { this.props.curUi === 'channel' && <ActiveRepo name={item} addSelected={function(){}} removeSelected={function(){}}/>}
            </ModalDialog>
          </ModalContainer>
        } 

					<span className="ListItem-Name-Text">
						{item}
					</span> {/* ListItem-Name-Text */}
					{this.props.curUi === "team" && this.props.currentlyOnline.includes(item) &&
						<span className="ListItem-Online pull-right">
							&nbsp;
						</span>
					}
					{this.props.curUi === "team" && !this.props.currentlyOnline.includes(item) &&
						<span className="ListItem-Offline pull-right">
							&nbsp;
						</span>
					}
					{this.props.curUi === "channel" &&
						<div className="pull-right">
						<span onClick={this.handleClick} className="ListItem-Offline">
							&nbsp;
							{this.state.isShowingModal &&
							<ModalContainer onClose={this.handleClose}>
								<ModalDialog onClose={this.handleClose}>
									<h1>Recent Activity for: {item}</h1>
									{ this.props.curUi === 'team' && <ActiveUser name={item} addSelected={function(){}} removeSelected={function(){}}/> }
									{ this.props.curUi === 'channel' && <ActiveRepo name={item} addSelected={function(){}} removeSelected={function(){}}/>}
								</ModalDialog>
							</ModalContainer>
							}
						</span>
						<span>&nbsp;</span>
							<span onClick={removeChannel} className="glyphicon glyphicon-minus"></span>
						</div>
					}
				</div> {/* ListItem-Name */}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUi: state.ui.selected,
		currentlyOnline: state.team.currentlyOnline
	}
}

function mapDispatchToProps(dispatch) {
	return {
		removeChannel: bindActionCreators(ChannelActions.removeChannel, dispatch)
	}
}

	export default connect(mapStateToProps, mapDispatchToProps)(List)
