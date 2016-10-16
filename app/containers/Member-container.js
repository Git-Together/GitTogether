import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as member from '../actions/member-actions.js';
import * as ui from '../actions/ui-actions.js';
import * as team from '../actions/team-actions.js';
import PanelPage from '../components/_shared/Panel-Page/Panel-Page-component.js';


function mapStateToProps(state) {
  return {
    list: state.member.members,
    icon: state.member.icon,
    panelMessage: state.member.panelMessageArray[state.member.panelMessagePlayIndex] || 'Your current active repo',
    panelMessageArray: state.member.panelMessageArray,
    selected: state.member.activeMemberId,
    uiSelected: state.ui.selected,
    currentUi: 'member',
    activeUi: state.ui.activeUi
  };

}

function mapDispatchToProps(dispatch) {
  return {
    toggleComponent: bindActionCreators(ui.toggleComponent, dispatch),
    changeSelected: bindActionCreators(member.changeActiveMember, dispatch),
    addSelected: bindActionCreators(team.addTeamMember, dispatch),
    removeSelected: bindActionCreators(team.removeTeamMember, dispatch),
    getList: bindActionCreators(team.refreshTeamMembers, dispatch)
  }
}
// function mapDispatchToProps(dispatch) {
//   return {
//     changeSelected: bindActionCreators(member.changeActiveMember, dispatch),
//     addSelected: bindActionCreators(member.addMember, dispatch),
//     removeSelected: bindActionCreators(member.removeMember, dispatch),
//     getList: bindActionCreators(member.getMembers, dispatch)
//   }
// }
export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
// export default connect(mapStateToProps, mapDispatchToProps)(PanelPage)
