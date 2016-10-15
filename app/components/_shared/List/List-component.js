import React, { Component, PropTypes } from 'react';
import './List.scss';
import ListItem from './ListItem-component.js'
import SearchInput, {createFilter} from 'react-search-input'

export default class List extends Component {
  constructor (props) {
    //Passed down in props
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.display = this.display.bind(this);

    
  }

  static propTypes = {

  };

  display(list){
    return list? list.map((e, index) => {
      return <ListItem key={index} item={e} changeSelected={this.props.changeSelected}/>
    }) : [];
  }

  render() {
    const KEYS_TO_FILTERS = ['path', 'full_name']
    const filteredList = this.props.list.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div className="ListComponent">
        {
          (this.props.currentUi !== 'file' && this.props.currentUi !== 'repos') && 
          this.display(this.props.list)
        }
        {
          (this.props.currentUi === 'file' || this.props.currentUi === 'repos') &&
          <div>
            <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
            { this.display(filteredList) } 
          </div>
        }
      </div>
    )
    
  }

  searchUpdated (term) {
    this.setState({
      searchTerm: term
    })
  }
}
