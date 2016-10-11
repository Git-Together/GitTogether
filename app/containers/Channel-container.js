import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as channel from '../actions/channel-actions.js';
import List from '../components/_shared/List/List-component.js';

function mapStateToProps(state) {
  return {
    list: state.channel.channels,
    icon: state.channel.icon, //Page Icon
    panelMessage: state.channel.panelMessageArray[state.channel.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.channel.panelMessageArray,
    selected: state.channel.activeRepoId,
    uiSelected: state.ui.selected,
    currentUi: 'channel'
  };
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     changeSelected: bindActionCreators(channel.loadChannels, dispatch),
//     addSelected: bindActionCreators(channel.loadChannels, dispatch),
//     removeSelected: bindActionCreators(channel.loadChannels, dispatch),
//     getList: bindActionCreators(channel.loadChannels, dispatch)
//   }
// }

export default connect(mapStateToProps)(List)
// export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
