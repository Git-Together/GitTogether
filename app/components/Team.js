import React, {Component, PropTypes} from 'react';
import styles from './Team.scss';
import IndividualMember from './individualMember.js';
import IndividualActiveTeam from './individualActiveTeam.js';

export default class Team extends Component {
  constructor(props){
    super(props)
  }
  static propTypes = {};

  display (array) {

    return array.map(
        e => {
          console.log("e", e)
          return (
            <div key={e.id}>
              <IndividualMember
                name={e.name}
                id={e.id}
                changeActiveTeamMember={this.props.changeActiveTeamMember.bind(this,e.id)}
               />
            </div>
         )}
    )
  };

  activeMember (array) {
    return array.filter(e=>e.id === this.props.activeTeamMember)[0]
  }

  render() {
    console.log(this.props)
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
