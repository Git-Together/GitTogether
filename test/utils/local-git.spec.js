import { expect } from 'chai';
const exec = require('child_process').exec;
import Promise from 'bluebird';
const shell = require('shelljs')
var git = require('simple-git')

before(function(done) {

	shell.cd(`~`)
	shell.mkdir(`rgit-test`)
	shell.cd(`rgit-test`)
	shell.touch('imaginary.js')
	git()
		.init()
		.add('./*')
		.commit('Test commit')
		.checkoutLocalBranch('second-branch')
		.then(done)
})

after(function() {
	shell.cd(`~`)
	shell.rm(`-rf`, `rgit-test`)
})

describe('simple-git branch command', function() {
	var commandResult

	before(function(done) {
		git().branch(function(err, summary) {
			if (err) {
				console.error(err)
				return
			}
			commandResult = summary
			done()
		})
	})

	it('should return an object', function() {
		expect(commandResult).to.be.an('object')
	});

	it('should list all branches in local workspace', function() {
		let branches = Object.keys(commandResult.branches)
		expect(branches).to.be.an('array')
		expect(branches).to.include('master')
		expect(branches).to.include('second-branch')
	});

	it('should indicate current working branch', function() {
		expect(commandResult.current).to.be.a('string')
		expect(commandResult.current).to.equal('second-branch')
	});
})
