import React, {Component, PropTypes} from 'react';
import styles from './Collaborators.scss';
import IndividualCollab from './individualCollab.js';
import IndividualActiveTeam from './individualActiveTeam.js';

export default class Team extends Component {
  constructor(props){
    super(props)
  }
  static propTypes = {};

  display (array) {

    return array.map(
        e => {
          return (
            <div key={e}>
              <IndividualCollab
                name={e}
                // id={e.id}
                addTeamMember={this.props.addTeamMember.bind(this,e)}
                changeActiveTeamMember={this.props.changeActiveTeamMember.bind(this,e)}
               />
            </div>
         )}
    )
  };

  activeMember (array) {
    return array.filter(e=>e.id === this.props.activeTeamMember)[0]
  }

  render() {
    return (
      <div className={[styles.container, 'purple'].join(' ')}>
        {this.display(this.props.team)}
        <IndividualActiveTeam
          member={this.activeMember(this.props.team)}
        />

      </div>
    )
  };
}
