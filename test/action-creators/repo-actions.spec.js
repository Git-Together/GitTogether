/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import Promise from 'bluebird'
import * as RepoActions from '../../app/actions/repo-actions.js'
import axios from 'axios'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

const middlewares = [axios]
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
	afterEach(() => {
		nock.cleanAll()
	})

	it('creates GET_USER_REPOS when repos have been fetched from Github API', () => {
		let fakeAccessToken = 1
		nock('http://api.github.com/')
			.get(`/user/repos?affiliation=owner,collaborator&per_page=100&access_token=${fakeAccessToken}`)
			.reply(200, { 
				body: { 
					data: ['hello'] 
				} 
			})
		
		const expectedActions = [
			{ type: 'GET_USER_REPOS', repos: ['hello'] }
		]

		const store = mockStore({ 
			auth: {
				token: 1
			},
			repos: ['initial']
		})

		console.log(`store ${store}`)

		return store.dispatch(RepoActions.getUserRepos())
			.then(() => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
	})
})

