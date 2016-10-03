import React, {Component, PropTypes} from 'react';
import styles from './Branches.scss';
import IndividualBranch from './individualBranch.js';
import IndividualActiveBranch from './individualActiveBranch.js';

export default class Branches extends Component {
  constructor(props){
    super(props)

  }
  static propTypes = {};

  display (array) {
    console.log("props", this.props)
    return array.map(
        e => {
          console.log("e", e)
          return (
            <div key={e.id}>
              <IndividualBranch
                branchName={e.branchName}
                id={e.id}
                local={e.local}
                lastUpdated={e.lastUpdated}
                changeActiveBranch={this.props.changeActiveBranch.bind(this,e.id)}
               />
            </div>
         )}
    )
  };

  activeBranch (array) {
    return array.filter(e=>e.id === this.props.activeBranch)[0]
  }

  render() {
    return (
      <div className={[styles.container, 'purple'].join(' ')}>
        {this.display(this.props.branches)}
        <IndividualActiveBranch
          branch={this.activeBranch(this.props.branches)}
        />

      </div>
    )
  };
}
