import React, { Component, PropTypes } from 'react';
import './ListView.scss';
import ListItem from './ListItem-component.js'




export default class List extends Component {
	constructor (props) {
		super(props);
		this.state = {

		}
		this.display = this.display.bind(this);
	}

	static propTypes = {

	};

	componentWillMount(){
		if(this.props.getList) { 
			this.props.getList(); 
		}
	} 

	componentWillReceiveProps(nextProps) {
		if(nextProps.list) {
			this.setState({
				list: nextProps.list
			})
		}
	}

	display(){
		return this.props.list? this.props.list.map((e, index) => {
			// return <ListItem key={index} item={e} />
			return <ListItem key={index} item={e} changeSelected={this.props.changeSelected} curUi= {this.props.currentUi} isTeam={this.props.currentUi==='team' || this.props.currentUi === 'channel'}/>
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
