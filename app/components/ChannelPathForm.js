import React, {Component, PropTypes} from 'react';
import styles from './Dashboard.scss';
import Repos from './Repos.js';
import { remote } from 'electron';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as RepoActions from '../actions/repo.js';
import { bindActionCreators } from 'redux';

import Promise from 'bluebird';
const storage = Promise.promisifyAll(require('electron-json-storage'))
import git from 'simple-git';

class pathInput extends Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const { input: { onChange } } = this.props
		onChange(e.target.files[0])
	}

	componentDidMount() {
		this.refs.x.directory = true;
		this.refs.x.webkitdirectory = true;
	}

	render() {
		const { input : { value } } = this.props
		return (
			<input type="file" ref='x' value={value} onChange={this.onChange} />
		)
	}
}

class changeChannelPathForm extends Component {
	constructor(props){
		super(props)
		this.sendFormAction = this.sendFormAction.bind(this)
	}

	static propTypes = {
	}

	sendFormAction(values, event) {
		let user = this.props.auth.currentUser
		let channel = this.props.repo.channelName
		let path = values.path.path
		if ( values.checkClone === "needsClone" ) {
			git().clone(`https://github.com/${channel}.git`, path)
		}
		return storage.getAsync('channels')
			.then(cachedChannels => {
				console.log('got this from cache ', cachedChannels)
				cachedChannels[user][channel] = path
				console.log('going to cache this ', cachedChannels)
				return storage.setAsync('channels', cachedChannels)
			})
			.then(() => {
				this.props.dispatch({
					type: 'CHANGE_CHANNEL_PATH',
					path
				})
				return
		})
	}	

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props
		const { dispatch } = this.props
		const { RepoActions } = this.props
		return (
			<form onSubmit={handleSubmit(this.sendFormAction)}>
				<div>
					<label>Select filepath:</label>
					<div>
						<Field type="file" name="path" component={pathInput} />
					</div>
				</div>
				<div>
					<label>Choose method:</label>
					<div>
						<label><Field name="checkClone" component="input" type="radio" value="needsClone" />Clone from Github</label><br />
						<label><Field name="checkClone" component="input" type="radio" value="alreadyExists" />Repo already in this directory</label>
					</div>
				</div>
				<div>
					<button type="submit" disabled={ pristine || submitting }>Submit</button>
				</div>
			</form>
		)
	}
}

changeChannelPathForm = reduxForm({
	form: 'path'
})(changeChannelPathForm)

function mapStateToProps(state) {
	return { 
		repo: state.repo,
		auth: state.auth	
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(RepoActions, dispatch)
}

changeChannelPathForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(changeChannelPathForm)

export default changeChannelPathForm
