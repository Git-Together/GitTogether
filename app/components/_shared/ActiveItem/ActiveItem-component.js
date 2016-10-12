import React, { Component, PropTypes } from 'react';
import './ActiveItem.scss';

export default class ActiveItem extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    // this.displayRow = this.displayRow.bind(this);
    // this.displayHeader = this.displayHeader.bind(this);
    // this.displayData = this.displayData.bind(this);

    // this.props.activeItem.mainView = [{name: 'asdf', last: 'basdffads', message: 'Hello'}];
  }

  static propTypes = {

  };

  // displayRow(){
  //   return this.props.activeItem.mainView.length > 0 ? this.props.activeItem.mainView.map((e, index)=> {
  //     return <tr key={index}> {this.displayData(e)} </tr> }) : ''
  // }

  // displayHeader(){
  //   return this.props.activeItem.mainView.length > 0 ? <th> {this.displayData(this.props.activeItem.mainView[0])} </th>  : ''
  // }

  // displayData(e){
  //   console.log('Display Data', e);
  //   let element = [];
  //   for(var column in e){
  //     element.push(<td key={column}> {e[column]} </td>);
  //   }
  //   console.log('Element Array', element);
  //   return element;
  // }

  /*
    [{
      firstName: 
      lastName:
      age: 
    }, {
      firstName:
      lastName:
      age:
    }]
  */



  render() {
	  let style = {}
	  console.log("ACTIVE ITEM PROPS ", this.props)
	  if (this.props.activeItem.path) {
		  style.color = 'darkblue'
		  style.fontSize = '16px'
		  style.marginTop = '18px'
		  style.width = '100%'
		  style.overflowWrap = 'break-word'
	  }
    return (
      <div className="ActiveItem">

        <div className="ActiveItem-Name">

          <div style={style} className="ActiveItem-Name-Text">
            {this.props.activeItem.name ? this.props.activeItem.name : this.props.activeItem.path}
          </div> {/* ActiveItem-Name-Text */}

        </div> {/* ActiveItem-Name */}
        {/*
        <div className="ActiveItem-Details">

          <div className="ActiveItem-Details-Content">
            {this.props.activeItem.details}
          </div> 

        </div>*/}
        <div className="ActiveItem-Functionality">

          <div
            onClick={this.props.addSelected.bind(null, this.props.activeItem.name)}
            className="ActiveItem-Functionality-Add">
            +
          </div> {/* ActiveItem-Functionality-Add */}

          <div
            onClick={this.props.removeSelected.bind(null)}
            className="ActiveItem-Functionality-Remove">
          -
          </div> {/* ActiveItem-Functionality-Remove */}

        </div>{/* ActiveItem-Functionality */}

        <div className="ActiveItem-MainView">

          <div className="ActiveItem-MainView-Content">
            <table>
            {/*
                {this.displayHeader()}
                {this.displayRow()} */}
            </table> 
            {this.props.activeItem.mainView}
          </div> {/* ActiveItem-Name-MainView-Content */}

        </div>{/* ActiveItem-MainView */}

      </div>
    )
  }
}
