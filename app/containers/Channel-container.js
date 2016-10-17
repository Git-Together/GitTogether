import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as channel from '../actions/channel-actions.js';
import * as repo from '../actions/repo-actions.js';
import * as ui from '../actions/ui-actions.js';
import ListView from '../components/_shared/List/ListView-component.js';

function mapStateToProps(state) {
  return {
    list: state.channel.channels,
    icon: state.channel.icon, //Page Icon
    panelMessage: state.channel.panelMessageArray[state.channel.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.channel.panelMessageArray,
    selected: state.channel.activeChannelId,
    uiSelected: state.ui.selected,
    currentUi: 'channel',
    activeUi: state.ui.activeUi
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
    getList: bindActionCreators(channel.loadChannels, dispatch),
    changeSelected: bindActionCreators(repo.getRepoTree, dispatch)
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


export default connect(mapStateToProps, mapDispatchToProps)(ListView)
// export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)

