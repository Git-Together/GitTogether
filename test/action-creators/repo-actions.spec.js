/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import * as RepoActions from '../../app/actions/repo-actions.js'

describe('repo actions', () => {
	describe('addRepo action', () => {
		it('should create an action to add a repo', () => {
			let dummyRepo = 'Dummy repo'
			const addRepoAction = {
				type: 'ADD_REPO',
				repo: dummyRepo
			}

			expect(RepoActions.addRepo(dummyRepo)).to.be.an('object')
			expect(RepoActions.addRepo(dummyRepo)).to.deep.equal(addRepoAction)
		})
	})
})
