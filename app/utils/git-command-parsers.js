//Reference for contents of this file:
//
//FUNCTION logParser:
//		INPUT: string 'logs', produced by running `git log --oneline` with simple-git
//		OUTPUT: an array of arrays with the following structure:
//			[ [hash for commit, commit message], [hash for commit, commit message], etc.]
//
//FUNCTION diffParser:
//		INPUT: string 'readout', produced by running `git diff` with simple-git
//		OUTPUT: an object with the following structure
//			{
//				(first filename): [ [line where changed section begins, line where changed section ends], etc. ],
//				(second filename): [ [line#, line#], etc],
//				etc.
//			}

export function logParser(logs) {
	let parsedLogs = logs.all.map( logLine => {
		let lineArr = logLine.hash.split(" ");
		return [lineArr.shift(), lineArr.join(" ")]
	})

	return parsedLogs
}

export function diffParser (readout) {
	let parsedObj = {}, filenames = [], match

	//regexp to isolate files that diff flags as having changed
	// let filenameRegexp = /--git a\/([\w]+.[\w]+)/g
	let filenameRegexp = /--git a\/([\S]+)/g
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
		let diffChunk = chunkRegexp.exec(readout)[0], lines = [], lineNumbers, lineRegexp = new RegExp('@@ ([\\S]+) ([\\S]+) @@', 'g')

		//loop through the chunk of text associated with current filename, grabbing the range in each file (starting and ending lines)
		//that have changed since last commit
		while (lineNumbers = lineRegexp.exec(diffChunk)) {
			let origStartLine = +lineNumbers[1].slice(1).split(',')[0]
			let origEndLine = lineNumbers[1].slice(1).split(',')[1] ? origStartLine + +lineNumbers[1].slice(1).split(',')[1] : null
			let localStartLine = +lineNumbers[2].slice(1).split(',')[0]
			let localEndLine = lineNumbers[2].slice(1).split(',')[1] ? origStartLine + +lineNumbers[2].slice(1).split(',')[1] : null
			if (isNaN(origEndLine)) origEndLine = origStartLine
			lines.push([origStartLine, origEndLine, localStartLine, localEndLine])
		}
		//write the results into the object to be returned at the end of the function, with the name of the file as the key and an array of arrays of line ranges
		//as the value
		parsedObj[filename] = lines
	})

	//once all the filenames have been iterated through, return the resultant object
	return parsedObj
}


