import React, {Component, PropTypes} from 'react';
import styles from './CreateChannel.scss';
import IndividualCreateChannel from './individualCreateChannel.js';

let conventionsName;
let conventionsValue;
let editId = null;

export default class CreateChannel extends Component {
  constructor(props){
    super(props)
    this.display = this.display.bind(this);
  }

  static propTypes = {};

  display (array) {
    // let editConvention = (editConventionsName, editConventionsValue, id) => {
    //   this.setState({
    //     btnText: 'Edit Convention'
    //   })
    //   editId = id;
    //   conventionsName.value = editConventionsName
    //   conventionsValue.value = editConventionsValue

    // }

    return array.map(
        e => {
          return (
            <div key={e.id}>
              <IndividualCreateChannel
                name={e.name}
                addChannel={this.props.addChannel.bind(this,e)}
                removeChannel={this.props.removeChannel.bind(this,e.id)}
                id={e.id}
               />
            </div>)
        }
    )
  };

  componentWillMount() {
    this.props.getUserRepos()
  }
  render() {

    return (
       <div className={[styles.container, 'purple'].join(' ')}>

        {this.display(this.props.repos)}

      </div>
    )
  };
}
