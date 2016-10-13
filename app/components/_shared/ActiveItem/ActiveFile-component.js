import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import './ActiveItem.scss';

class ActiveFile extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {

  };

  render() {
	  console.log('active item props ', this.props)
	  let style = {
		  fontSize: '16px',
		  width: '100%',
		  overflowWrap: 'break-word'
	  }
	  let path = this.props.activeItem.path
	  const { repoId } = this.props
	return (
		<div className="ActiveItem">

			<div className="ActiveItem-Name">

				<div style={style} className="ActiveItem-Name-Text">
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

		  <div
			onClick={this.props.addSelected.bind(null, repoId, path)}
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

function mapStateToProps(state) {
	return {
		repoId: state.repo.channelName
	}
}

export default connect(mapStateToProps)(ActiveFile)
