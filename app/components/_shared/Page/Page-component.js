import React, { Component, PropTypes } from 'react';
import './Page.scss';
import List from '../List/List-component';
import ActiveItem from '../ActiveItem/ActiveItem-component';
import ActiveFile from '../ActiveItem/ActiveFile-component';
import ActiveUser from '../ActiveItem/ActiveUser-component';
import ActiveRepos from '../ActiveItem/ActiveRepos-component';
import ActiveCollaborator from '../ActiveItem/ActiveCollaborator-component';
import { connect } from 'react-redux';
import ActiveWatch from '../ActiveItem/ActiveWatch-component';

class Page extends Component {
	constructor (props) {
		super(props);
		this.state = {
			list: this.props.list || []
		}
		this.filter = this.filter.bind(this);
	}

	static propTypes = {

	};

	componentWillMount(){
		if (this.props.getList) {
			this.props.getList();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			list: nextProps.list
		})
	}

	filter(...args){
		return this.props.list ? this.props.list.filter(item => {
			if (item.name) {
				return item.name === this.props.selected
			} else if (item.path) {
				return item.path === this.props.selected
			} else if (typeof item === 'string'){
				return item === this.props.selected
			}
		}) : [];
	}

	render() {
		const { currentUi } = this.props
		return (
			<div className="Page">
				<div className="Page-List">
					<List list={this.state.list} changeSelected={this.props.changeSelected}></List>
				</div>
				<div className="Page-ActiveItem">
					{currentUi === "repos" && <ActiveRepos  activeItem={this.filter(this.props.selected)[0] || {}}
						addSelected={this.props.addSelected}
						removeSelected={this.props.removeSelected}/>
					}
					{currentUi === "file" && <ActiveFile  activeItem={this.filter(this.props.selected)[0] || {}}
						addSelected={this.props.addSelected}
						removeSelected={this.props.removeSelected}/>
					}

          {currentUi === "watch" && <ActiveWatch  activeItem={this.filter(this.props.selected)[0] || {}}
            removeSelected={this.props.removeSelected}/>
          }

					{/*currentUi === "member" && <ActiveUser activeItem={this.filter(this.props.selected)[0] || {}*/}

					{currentUi === "member" && <ActiveCollaborator  activeItem={this.filter(this.props.selected)[0] || {}}

						addSelected={this.props.addSelected}
						removeSelected={this.props.removeSelected}/>
					}
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUi: state.ui.selected
	}
}

export default connect(mapStateToProps)(Page)
