import React, { Component, PropTypes } from 'react';
import './Page.scss';
import List from '../List/List-component';
import ActiveItem from '../ActiveItem/ActiveItem-component';

export default class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: this.props.list || []
    }
    this.filter = this.filter.bind(this);
    console.log("!!!!!!!!!!!!!", props)
  }

  static propTypes = {

  };

  componentWillMount(){
    this.props.getList();
  }

  componentWillReceiveProps(nextProps) {
    console.log("THIS IS NEXT PROPS FOR PAGE-COMPONENT", nextProps)
    this.setState({
      list: nextProps.list
    })
  }

  filter(...args){
    console.log("args",args)
    console.log("this.props.list!!!",this.props.list)
    return this.props.list? this.props.list.filter(item => {
      return item.name === this.props.selected
    }) : [];
  }

  render() {
    console.log("passed into list", this.state.list)
    return (
      <div className="Page">
          <div className="Page-List">
            <List list={this.state.list} changeSelected={this.props.changeSelected}></List>
          </div>
          <div className="Page-ActiveItem">
            <ActiveItem  activeItem={this.filter(this.props.selected)[0] || {}}
                      addSelected={this.props.addSelected}
                      removeSelected={this.props.removeSelected}/>
          </div>

      </div>
    )
  }
}
