# GitTogether
A Git tool for automated, real-time communication and transparency.

## About GitTogether
GitTogether is an Electron app that alleviates issues related to redundant or conflicting work in collaborative projects. Git itself creates and stores an enormous amount of data about project structure across files, branches, and repos. However, it doesn't make much of this information accessible to the team until users push their changes to a remote. Because of this structure, Git's potential to prevent issues from arising is underutilized, and it's only leveraged once something undesirable has already happened.

GitTogether hooks into these preexisting Git tools to make more effective use of available information. Local changes are broadcast in real-time to the team and to GitTogether's own server. This allows for both the just-in-time notification of team members when it seems that the project's health might be under threat, _and_ the recording of these changes as persistent data which is made available for easy reference.

GitTogether can be left to run in the background, only making itself known when it observes a problem. Alternatively, it could be used as a regular reference to keep track of how a project is changing and developing over time. It intuitively and naturally integrates itself into your normal workflow, and automatically synchronizes itself with your Github account so as to require minimum oversight. We hope you enjoy it.

## Technologies Used
- Electron
- React/Redux
- Socket.io
- D3
- PostgreSQL
- Express

## Download
[GitTogether Download](http://www101.zippyshare.com/v/CdLRyiB0/file.html)

## Setup
1. Download the application.
2. Mount the disk image.
3. Move the packaged app into your Applications folder.
4. Start GitTogether, and sign in with your Github username and password.
5. Once you've signed in, GitTogether will automatically load your channels, collaborators and files—no additional work necessary!

## License 
Copyright (C) Gil Lawson, Ten Loh, Milad Nazeri, Kin Tsang. Distributed under an MIT license.
