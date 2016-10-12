import React, { Component, PropTypes } from 'react';
import './ListView.scss';
import ListItem from './ListItem-component.js'

export default class List extends Component {
  constructor (props) {
    //Passed down in props
    super(props);
    this.state = {

    }
    this.display = this.display.bind(this);
    console.log('Props at constructor', props);
  }

  static propTypes = {

  };

  componentWillMount(){
    if(this.props.currentUi === 'channel') this.props.getList();
  }

  display(){
    console.log('Rendering Display of ListLIST VIEW', this.props);
    return this.props.list? this.props.list.map((e, index) => {
      return <ListItem key={index} item={e} />
      // return <ListItem key={index} item={e} changeSelected={this.props.changeSelected.bind(null, e.name)}/>
    }) : [];
  }

  render() {
    return (
            <div>
              <div className={this.props.icon + ' ListView-Icon'}></div>
              <div className="ListViewComponent">{this.display()}</div>
            </div>

    )
  }
}
