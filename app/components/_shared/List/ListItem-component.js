import React, { Component, PropTypes } from 'react';
import './ListItem.scss';
import { connect } from 'react-redux'


import {ModalContainer, ModalDialog} from 'react-modal-dialog';

// class View extends React.Component {
//   state = {
//     isShowingModal: false,
//   }
//   handleClick = () => this.setState({isShowingModal: true})
//   handleClose = () => this.setState({isShowingModal: false})
//   render() {
//     return <div onClick={this.handleClick}>
//       {
//         this.state.isShowingModal &&
//         <ModalContainer onClose={this.handleClose}>
//           <ModalDialog onClose={this.handleClose}>
//             <h1>Dialog Content</h1>
//             <p>More Content. Anything goes here</p>
//           </ModalDialog>
//         </ModalContainer>
//       }
//     </div>;
//   }
// }

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
    return (
      <div className="ListItem" onClick={this.props.changeSelected.bind(null, item)}>

        <div className="ListItem-Name" onClick={this.handleClick}>
          {/*{
          this.state.isShowingModal && 
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Dialog Content</h1>
               <p>More Content. Anything goes here</p>
            </ModalDialog>
          </ModalContainer>
        } */}

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
