import React, { Component, PropTypes } from 'react';
import Table from 'rc-table';
import { connect } from 'react-redux'
import './ActiveItem.scss';
import {values} from 'lodash';

class ActiveWatch extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {

  };

  render() {
    let pathStyle = {
      fontSize: '16px',
      width: '100%',
      overflowWrap: 'break-word'
    }
    let buttonStyle = {
      textAlign: 'center',
      fontSize: '16px'
    }
    let path = this.props.activeItem.name
    const { repoId, events } = this.props
    const columns = [
      { title: 'User', dataIndex: 'user.name', key:'user.name', width: 200},
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
      onClick={this.props.removeSelected.bind(null)}
      className="ActiveItem-Functionality-Remove">
        Unsubscribe from this file
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
    repoId: state.repo.channelName,
    events: state.file.activeEvents ? state.file.activeEvents.events : []
  }
}


export default connect(mapStateToProps)(ActiveWatch)
