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
      { title: 'User Name', dataIndex: 'user.name', key:'user.name', width: 200},
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
		events: state.repo.activeRepoEvents
	}
}


export default connect(mapStateToProps)(ActiveUser)
