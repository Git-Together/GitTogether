import React, { Component, PropTypes } from 'react';
import './ActiveItem.scss';
import Table from 'rc-table';
import {values} from 'lodash';
import { connect } from 'react-redux'


class ActiveUser extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {

  };

  render() {
    const { events } = this.props
		const columns = [
			{ title: 'Event Type', dataIndex: 'eventType', key:'name', width: 200},
			{ title: 'Date', dataIndex: 'createdAt', key:'createdAt', width: 200},
			{ title: 'Original Line Start', dataIndex: 'origLineStart', key:'origLineStart', width: 200},
			{ title: 'Original Line End', dataIndex: 'origLineEnd', key:'origLineEnd', width: 200},
			{ title: 'Local Line Start', dataIndex: 'localLineStart', key:'localLineStart', width: 200},
			{ title: 'Local Line End', dataIndex: 'localLineEnd', key:'localLineEnd', width: 200},
		]
		let data = events ? events.map(e => {
			let date = new Date(Date.parse(e.createdAt))
			e.createdAt = date.toLocaleDateString("en-US");
			return e
		}) : [];
    return (
      <div className="ActiveItem">

        <div className="ActiveItem-Name">

          <div className="ActiveItem-Name-Text">
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
            onClick={this.props.removeSelected.bind(null, this.props.activeItem.name)}
            className="ActiveItem-Functionality-Remove">
          -
          </div> {/* ActiveItem-Functionality-Remove */}

        </div>{/* ActiveItem-Functionality */}

        <div className="ActiveItem-MainView">

          <div className="ActiveItem-MainView-Content">

            <Table columns={columns} data={data} />
          </div> {/* ActiveItem-Name-MainView-Content */}

        </div>{/* ActiveItem-MainView */}

      </div>
    )
  }
}

function mapStateToProps(state) {
	return {
		events: state.team.activeEvents
	}
}


export default connect(mapStateToProps)(ActiveUser)
