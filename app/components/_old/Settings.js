import React, {Component, PropTypes} from 'react';
import styles from './Settings.scss';
import IndividualSetting from './individualSetting.js';

let settingsName;
let settingsValue;
let editId = null;

export default class Settings extends Component {
  constructor(props){
    super(props)
    this.display = this.display.bind(this);
    this.state = {
      btnText: 'Add Setting'
    }
  }

  static propTypes = {};

  display (array) {
    let editSetting = (editSettingsName, editSettingsValue, id) => {
      this.setState({
        btnText: 'Edit Setting'
      })
      editId = id;
      settingsName.value = editSettingsName
      settingsValue.value = editSettingsValue

    }

    return array.map(
        e => {
          return (
            <div key={e.id}>
              <IndividualSetting
                name={e.name}
                id={e.id}
                value={e.value.toString()}
                delete={this.props.removeSettings.bind(this,e.id)}
                update={editSetting.bind(this,e.name,e.value, e.id)}
               />

            </div>)
        }
    )
  };

  render() {

    return (
       <div className={[styles.container, 'purple'].join(' ')}>

        {this.display(this.props.settings)}
          <div>
            <form onSubmit={e => {
              e.preventDefault()
              if (!settingsName.value.trim()) {
                return
              }
              if (!settingsValue.value.trim()) {
                return
              }
              editId?
                this.props.updateSettings(editId, {name: settingsName.value, value: settingsValue.value, id: editId}):
                this.props.addSettings({name: settingsName.value, value: settingsValue.value});
              settingsName.value = '';
              settingsValue.value = '';
              editId = null;
              this.setState({
                btnText: 'Add Setting'
              })
            }}>
            <input
              style={{color:"black"}}
              ref={node => {
                settingsName = node
              }}
              defaultValue="Enter setting" />
            <input
              style={{color:"black"}}
              ref={node => {
                settingsValue = node
              }}
              defaultValue="Enter Setting Value" />
            <button
              className='btn btn-default'
              type="Submit Setting">
              {this.state.btnText}
            </button>
          </form>
        </div>
      </div>
    )
  };
}
