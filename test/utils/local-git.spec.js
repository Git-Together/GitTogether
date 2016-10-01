import { expect } from 'chai';
const exec = require('child_process').exec;
import Promise from 'bluebird';
const shell = require('shelljs')
const git = require('simple-git')
const fs = require('fs')

before('initialize testing repo', function(done) {
	shell.cd(`~`)
	shell.mkdir(`rgit-test`)
	shell.cd(`rgit-test`)
	shell.touch('file1.js')
	git()
		.init()
		.add('./*')
		.commit('Test commit')
		.checkoutLocalBranch('second-branch', function(success, failure) {
			if (failure) {
				console.error(failure)
				return
			}
		})
		.then(done)
})

after(function(done) {
	shell.rm(`-rf`, `~/rgit-test`)
	done()
})

describe('result of running \'git branch\' through node', function() {
	var branchResult

	before('run branch command', function(done) {
		git().branch(function(err, summary) {
			if (err) {
				console.error(err)
				return
			}
			branchResult = summary
			done()
		})
	})

	it('should return an object', function() {
		expect(branchResult).to.be.an('object')
	});

	it('should list all branches in local workspace', function() {
		let branches = Object.keys(branchResult.branches)
		expect(branches).to.be.an('array')
		expect(branches).to.include('master')
		expect(branches).to.include('second-branch')
	});

	it('should indicate current working branch', function() {
		expect(branchResult.current).to.be.a('string')
		expect(branchResult.current).to.equal('second-branch')
	});
})


describe('function for parsing \'git diff\' run from node', function() {
	var diffResult,
		//function for paring the result of 'git diff' down to useful information
		readoutParser = function(readout) {
			let parsedObj = {}, filenames = [], match

			//regexp to isolate files that diff flags as having changed
			let filenameRegexp = /--git a\/([\w]+.[\w]+)/g
			//put each into an array
			while (match = filenameRegexp.exec(readout)) {
				filenames.push(match[1])
			}

			//iterate through that array
			filenames.forEach( (filename, index, filenames) => {
				let chunkRegexp;
				//isolate the chunk of git diff readout that corresponds to each file, either by:
				if (index === filenames.length - 1) {
					//grabbing the text between the file name and the end of the input, in the case of the last flagged file
					chunkRegexp = new RegExp(filename + '[\\s\\S]*', 'g')
				} else {
					//or grabbing the text between the file name and the following file name
					chunkRegexp = new RegExp(filename + '[\\s\\S]*(?=diff --git a/' + filenames[index + 1] + ')', 'g')
				}

				//then declare regexp to capture affected lines
				let diffChunk = chunkRegexp.exec(readout)[0], lines = [], lineNumbers, lineRegexp = new RegExp('@@ -(\\d+)[,(\\d+)]*', 'g')
			
				//loop through the chunk of text associated with current filename, grabbing the range in each file (starting and ending lines)
				//that have changed since last commit
				while (lineNumbers = lineRegexp.exec(diffChunk)) {
					let startLine = +lineNumbers[1]
					let endLine = +lineNumbers[1] + lineNumbers[2]
					if (isNaN(endLine)) endLine = startLine
					lines.push([startLine, endLine])
				}
				//write the results into the object to be returned at the end of the function, with the name of the file as the key and an array of arrays of line ranges
				//as the value
				parsedObj[filename] = lines
			})

			//once all the filenames have been iterated through, return the resultant object
			return parsedObj
		}

	before('make changes and run diff', function(done) {
		let gitBase = git()
		shell.touch('file2.js')
		shell.touch('file3.js')
		fs.writeFileSync('file3.js', 'Text to be removed', 'utf8')
		gitBase
			.add('./*')
			.commit('Stage empty file')
			.then(data => {
				return Promise.all([fs.writeFileSync('file1.js', 'Added text', 'utf8'),
				fs.writeFileSync('file2.js', 'Also added text here', 'utf8'),
				fs.writeFileSync('file3.js', '', 'utf8')])
			})
			.diff(( err, diffReadout ) => {
				if (err) {
					console.error(err)
					return
				}
				diffResult = readoutParser(diffReadout)
				done()
			})
	})
	
	it('should be an object', function() {
		expect(diffResult).to.be.an('object')
	})

	it('should list all changed files', function() {
		expect(Object.keys(diffResult)).to.eql(['file1.js', 'file2.js', 'file3.js'])
	})

	it('should specify the changed lines for each file', function() {
		expect(diffResult['file1.js']).to.eql([[0, 0]])
		expect(diffResult['file2.js']).to.eql([[0, 0]])
		expect(diffResult['file3.js']).to.eql([[1, 1]])
	})

	it('should return an empty object if no changes have been made', function(done) {
		git()
			.add('./*')
			.commit('Updating')
			.diff(( err, updatedDiffReadout ) => {
				if (err) {
					console.error(err)
					return
				}
				let newDiffResult = readoutParser(updatedDiffReadout)
				expect(newDiffResult).to.be.empty
				done()
			})
	})
})
