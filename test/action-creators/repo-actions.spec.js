/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import { spy } from 'sinon'
import * as RepoActions from '../../app/actions/repo-actions.js'

describe('repo actions', () => {
	it('should fail this test', () => {
		expect(RepoActions.addRepo('bert').to.deep.equal('hillary'))
	})
})
