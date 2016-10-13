import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import './ActiveItem.scss';
import {values} from 'lodash';

class ActiveFile extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
		this.displayTableData = this.displayTableData.bind(this);
  }

  static propTypes = {

  };

	displayTableData(obj){
		console.log('DISPLAY TABLE DATA', values(obj));
		return values(obj) ? values(obj).map((e, index)=> {
			return (
				<tr key={index}>
					<td key={'eventType'}>{e.eventType}</td>
					<td key={'date'}>{e.createdAt.toString()}</td>
					<td key={'origLineStart'}>{e.origLineStart}</td>
					<td key={'origLineEnd'}>{e.origLineEnd}</td>
					<td key={'localLineStart'}>{e.localLineStart}</td>
					<td key={'localLineEnd'}>{e.localLineEnd}</td>
				</tr>
			)
		}) : '';
	}

	displayRow(){
		console.log('props in active file component', this.props);
		return this.displayTableData(this.props.events)
	}

	

  render() {
	  console.log('active item props ', this.props)
	  let pathStyle = {
		  fontSize: '16px',
		  width: '100%',
		  overflowWrap: 'break-word'
	  }
	  let buttonStyle = {
		  textAlign: 'center',
		  fontSize: '16px'
	  }
	  let path = this.props.activeItem.path
	  const { repoId, events } = this.props
	return (
		<div className="ActiveItem">

			<div className="ActiveItem-Name">

				<div style={pathStyle} className="ActiveItem-Name-Text">
					{path}
				</div> {/* ActiveItem-Name-Text */}

			</div> {/* ActiveItem-Name */}
			{/*
		<div className="ActiveItem-Details">

		  <div className="ActiveItem-Details-Content">
			{this.props.activeItem.details}
		  </div> 

		</div>*/}
		<div className="ActiveItem-Functionality">

		  <div style={buttonStyle}
			onClick={this.props.addSelected.bind(null, repoId, path)}
			className="ActiveItem-Functionality-Add">
			Subscribe to this file
		  </div> {/* ActiveItem-Functionality-Add */}

		  <div style={buttonStyle}
			onClick={this.props.removeSelected.bind(null)}
			className="ActiveItem-Functionality-Remove">
		  	Unsubscribe from this file
		  </div> {/* ActiveItem-Functionality-Remove */}

	  </div>{/* ActiveItem-Functionality */}

	  <div className="ActiveItem-MainView">

		  <div className="ActiveItem-MainView-Content">
			  <table>
					<tbody>
				{this.displayRow()}
				 </tbody>
								  {/*
				{this.displayRow()} */}
			</table> 
			{this.props.activeItem.mainView}
		  </div> {/* ActiveItem-Name-MainView-Content */}

	  </div>{/* ActiveItem-MainView */}

  </div>
  )
  }
}

function mapStateToProps(state) {
	return {
		repoId: state.repo.channelName,
		events: state.file.activeEvents.events
	}
}


export default connect(mapStateToProps)(ActiveFile)
