import React, {Component, PropTypes} from 'react';
import styles from './Conventions.scss';
import IndividualConvention from './individualConvention.js';

let conventionsName;
let conventionsValue;
let editId = null;

export default class Conventions extends Component {
  constructor(props){
    super(props)
    this.display = this.display.bind(this);
    this.state = {
      btnText: 'Add Convention'
    }
  }

  static propTypes = {};

  display (array) {
    let editConvention = (editConventionsName, editConventionsValue, id) => {
      this.setState({
        btnText: 'Edit Convention'
      })
      editId = id;
      conventionsName.value = editConventionsName
      conventionsValue.value = editConventionsValue

    }

    return array.map(
        e => {
          return (
            <div key={e.id}>
              <IndividualConvention
                name={e.name}
                id={e.id}
                value={e.value.toString()}
                delete={this.props.removeConventions.bind(this,e.id)}
                update={editConvention.bind(this,e.name,e.value, e.id)}
               />

            </div>)
        }
    )
  };

  render() {

    return (
       <div className={[styles.container, 'purple'].join(' ')}>

        {this.display(this.props.conventions)}
          <div>
            <form onSubmit={e => {
              e.preventDefault()
              if (!conventionsName.value.trim()) {
                return
              }
              if (!conventionsValue.value.trim()) {
                return
              }
              editId?
                this.props.updateConventions(editId, {name: conventionsName.value, value: conventionsValue.value, id: editId}):
                this.props.addConventions({name: conventionsName.value, value: conventionsValue.value});
              conventionsName.value = '';
              conventionsValue.value = '';
              editId = null;
              this.setState({
                btnText: 'Add Convention'
              })
            }}>
            <input
              style={{color:"black"}}
              ref={node => {
                conventionsName = node
              }}
              defaultValue="Enter convention" />
            <input
              style={{color:"black"}}
              ref={node => {
                conventionsValue = node
              }}
              defaultValue="Enter Convention Value" />
            <button
              className='btn btn-default'
              type="Submit Convention">
              {this.state.btnText}
            </button>
          </form>
        </div>
      </div>
    )
  };
}
