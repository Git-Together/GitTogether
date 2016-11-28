/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Promise from 'bluebird';
import * as RepoActions from '../../app/actions/repo-actions.js';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const storage = Promise.promisifyAll(require('electron-json-storage'))

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('sync repo actions', () => {

	let dummyRepo = 'Dummy repo'

	describe('addRepo action', () => {
		const addRepoAction = {
			type: 'ADD_REPO',
			repo: dummyRepo
		}
		it('should create an action to add a repo', () => {
			expect(RepoActions.addRepo(dummyRepo)).to.be.an('object')
			expect(RepoActions.addRepo(dummyRepo)).to.deep.equal(addRepoAction)
		})

		it('should create different actions depending on input', () => {
			let badRepo = 'Bad repo'
			const badRepoAction = {
				type: 'ADD_REPO',
				repo: badRepo
			}

			expect(RepoActions.addRepo(badRepoAction)).to.be.an('object')
			expect(RepoActions.addRepo(badRepoAction)).to.not.deep.equal(RepoActions.addRepo(addRepoAction))
		}) 
	})

	describe('removeRepo action', () => {
		const removeRepoAction = {
			type: 'REMOVE_REPO',
			id: dummyRepo
		}
		it('should create an action to remove a repo', () => {
			expect(RepoActions.removeRepo(dummyRepo)).to.be.an('object')
			expect(RepoActions.removeRepo(dummyRepo)).to.deep.equal(removeRepoAction)
		})

		it('should create different actions depending on input', () => {
			let badRepo = 'Bad repo'
			const badRepoAction = {
				type: 'REMOVE_REPO',
				repo: badRepo
			}

			expect(RepoActions.removeRepo(dummyRepo)).to.be.an('object')
			expect(RepoActions.removeRepo(badRepoAction)).to.not.deep.equal(RepoActions.removeRepo(removeRepoAction))
		})
	})
})

describe('async repo actions', () => {
	beforeEach(() => {
		mock.reset()
	})
	const mock = new MockAdapter(axios)
	it('creates GET_USER_REPOS when repos have been fetched from Github API', () => {
		let fakeAccessToken = 1
		const store = mockStore({ 
			auth: {
				token: 1
			},
			repos: ['initial']
		})

		mock.onGet(`https://api.github.com/user/repos?affiliation=owner,collaborator&per_page=100&access_token=${fakeAccessToken}`)
			.reply((config) => {
				return [200, ['hello']]
			})
		
		const expectedActions = [
			{ type: 'GET_USER_REPOS', repos: ['hello'] }
		]

		return store.dispatch(RepoActions.getUserRepos())
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})

	it('creates battery of actions to support initial fetch of repo from Github API', () => {
		const store = mockStore({ 
			auth: {
				token: 1,
				currentUser: 'JohnDoe',
				id: 1
			},
			ui: {
				selected: 'Basic view'
			},
			repos: ['initial']
		})
		const repo = "dummyRepo";
		const sha = 1;
		const state = store.getState();
		const events = ['dummy event']

		const expectedActions = [
			{
				type: 'SWITCH_ACTIVE_TREE',
				tree: 'dummy tree'
			},
			{
				type: 'SWITCH_ACTIVE_REPO',
				id: 1,
				name: repo,
				events
			},
			{
				type: 'CHANGE_ACTIVE_TEAM',
				channelId: repo
			},
			{
				type: 'CHANGE_ACTIVE_REPO',
				id: repo
			},
			{
				type: 'TOGGLE_TREE',
				component: state.ui.selected
			},
			{
				type: 'LOAD_MESSAGES',
				chatHistory: [{
					message: 'dummy message',
					author: 'JohnDoe',
					id: 1,
					timeStamp: new Date(0)
				}]
			},
			{
				type: 'CHANGE_CHANNEL_PATH',
				path: repo
			},
			{
				type: 'RESET_WATCH'
			},
			{
				type: 'GET_ALL_WATCH',
				watchList: []
			},
			{
				type: 'GET_COLLABORATORS',
				collaborators: ['collaborator1', 'collaborator2']
			}
		]
		
		mock.onGet(`https://api.github.com/repos/${repo}?access_token=${state.auth.token}`)
			.reply(200, {
				id: 1
			})
		mock.onGet(`https://api.github.com/repos/${repo}/git/refs/?access_token=${state.auth.token}`)
			.reply(200, [{
				object: {
					sha
				}
			}])
		mock.onGet(`https://api.github.com/repos/${repo}/git/trees/${sha}?recursive=1&access_token=${state.auth.token}`)
			.reply(200, 'dummy tree')
		mock.onGet(`${process.env.SERVER_URL}/api/channels/${repo}`)
			.reply(200, {
				events,
				chats: [{
					message: 'dummy message',
					authorName: 'JohnDoe',
					id: 1,
					createdAt: new Date(0)
				}]
			})
		mock.onGet(`${process.env.SERVER_URL}/api/files/?userId=${state.auth.id}`)
			.reply(200, [{
				repoId: repo
			}])
		mock.onGet(`https://api.github.com/repos/${repo}/collaborators?access_token=${state.auth.token}`)
			.reply(200, [{
				login: 'collaborator1'
			}, {
				login: 'collaborator2'
			}])
		
		let originalChannels;
		return storage.getAsync('channels')
			.then(channels => {
				originalChannels = channels
				if (!channels) {
					channels = {}
				}
				let currentUser = state.auth.currentUser
				channels[currentUser] = {}
				channels[currentUser][repo] = repo
				return storage.setAsync('channels', channels)
			})
			.then(() => {
				return store.dispatch(RepoActions.getRepoTree(repo))
			})
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
			.then(() => {
				return storage.setAsync('channels', originalChannels)
			})
	})
})

