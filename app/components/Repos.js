import React, {Component, PropTypes} from 'react';
import styles from './Repos.scss';
import IndividualRepo from './individualRepo.js';
import IndividualActiveRepo from './individualActiveRepo.js';

export default class Repos extends Component {
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
              <IndividualRepo
                name={e.name}
                id={e.id}
               />
            </div>
         )}
    )
  };

  activeRepo (array) {
    return array.filter(e=>e.id === this.props.repos.activeRepo)[0]
  }

  render() {
    console.log(this.props)
    return (
      <div className={[styles.container, 'purple'].join(' ')}>
        {this.display(this.props.repos.repos)}
        <IndividualActiveRepo repo={this.activeRepo(this.props.repos.repos)}/>
      </div>
    )
  };
}

