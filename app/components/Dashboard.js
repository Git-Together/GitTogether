import React, {Component, PropTypes} from 'react';
import styles from './Dashboard.scss';
import IndividualCheckout from './individualCheckout.js';

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    console.log("This is Daskboard props: ",this.props)
  }

  display(array) {
    if (array === undefined) {
      return ''
    } else {
    return array.map(
      e => {

        if(e.repoId === this.props.repo.activeRepo) {

         return (
          <div className={'grey'} key={e.fileId}>
            <IndividualCheckout {...e} unsubscribe={this.props.unsubscribe.bind(this, e.repoId, e.fileId)} />
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
