import React, {Component, PropTypes} from 'react';
import styles from './Dashboard.scss';
import IndividualCheckout from './individualCheckout.js';

export default class Dashboard extends Component {
  constructor(props){
    super(props)
  }

  display(array) {
    if (array === undefined) {
      return ''
    } else {
    return array.map(
      e => {

        if(e.repoId === this.props.repo.activeRepo) {

         return (
          <div className={'grey'}>
            <IndividualCheckout {...e} key={e.fileId} />
          </div>
          )
        }


      }

    )
  }
}

  static propTypes = {};
  render() {
    return (
      <div className={[styles.container, 'purple'].join(" ")}>
        {this.display(this.props.checkoutList)}
      </div>
    )
  };
}
