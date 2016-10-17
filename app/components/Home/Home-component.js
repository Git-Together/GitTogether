import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './Home.scss';

import Channel from '../../containers/Channel-container';
import Chat from '../../containers/Chat-container';
import File from '../../containers/File-container';
import Member from '../../containers/Member-container';
import Repo from '../../containers/Repo-container';
import Repos from '../../containers/Repos-container';
import Team from '../../containers/Team-container';
import Watch from '../../containers/Watch-container';
import { fileWatcher } from '../../utils/file-watch.js';
import { instantiateSockets, stopSockets } from '../../utils/incoming-sockets.js'

export default class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
		}
	}

	componentWillMount() {
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.auth.socketsStarted && nextProps.auth.token)  {
			fileWatcher()
			instantiateSockets(this.props.state, this.props.dispatch)
		}
	}

	componentWillUnmount() {
		stopSockets()
	}

	static propTypes = {

	};

  render() {

	  const { logout } = this.props
    let navArray = [
      { icon: 'glyphicon glyphicon-home', name: 'home' },
      { icon: 'glyphicon glyphicon-eye-open', name: 'watch' },
      { icon: 'glyphicon glyphicon-cloud-upload', name: 'repo' },
      { icon: 'glyphicon glyphicon-user', name: 'member' },
      { icon: 'glyphicon glyphicon-tasks', name: 'repos' },
      { icon: 'glyphicon glyphicon-file', name: 'file' },
      { icon: 'glyphicon glyphicon-comment', name: 'chat' }
    ];
		return (
      <div id='Container'>

        <div id="Header">

          <div id="Header-Logo">

            <div id="Header-Logo-Image">
              <span id="Header-Logo-Image-Git">Git</span>
              <span id="Header-Logo-Image-Together"><em>Together</em></span>
            </div> {/* -Header-Logo-Image */}

          </div> {/* -Header-Logo */}
          <div id="Header-Nav">

            <div id="Header-Nav-Text">
              <span id="Header-Nav-Text-UN"><em>{this.props.auth.currentUser}</em></span>
              <span id="Header-Nav-Text-Welcome">&nbsp; looking at</span>
              <span id="Header-Nav-Text-UN"><em>{this.props.repo.channelName}</em></span>
            </div> {/* -Headder-Nav-Text */}
            <div id="Header-Nav-IconBar">
              {
                navArray.map(e => {


                  return <div
                    key={e.icon}
                    className={this.props.activeUi === e.name?
                      `${e.icon} Header-Nav-IconBar-Icons active`:
                      `${e.icon} Header-Nav-IconBar-Icons`
                    }
                    onClick={this.props.toggleComponent.bind(null, `${e.name}`)}></div>
                  })
              }
			  <div className="glyphicon glyphicon-log-out Header-Nav-IconBar-Icons" onClick={logout}></div>
            </div> {/* -Header-Nav-IconBar */}

          </div> {/* -Header-Nav */}

        </div> {/* -Header */}

        <div id="Body">

          <div id="Body-ChannelTeam">

            <div id="Body-ChannelTeam-Channel">
              <Channel />
            </div>   {/*-Body-ChannelTeam-Channel */}

            <div id="Body-ChannelTeam-Team">
              <Team />
            </div>  {/*  -Body-ChannelTeam-Team */}

          </div> {/* -Body-ChannelTeam */}

          <div id="Body-Content">

            <div id="Body-Content-Watch">
              <Watch />
            </div>  {/* -Body-Content-Watch */}

            <div id="Body-Content-Repo">
              <Repo />
            </div>   {/* -Body-Content-Repo */}

            <div id="Body-Content-Member">
              <Member />
            </div>    {/* -Body-Content-Member */}

            <div id="Body-Content-Repos">
              <Repos />
            </div>

            <div id="Body-Content-File">
              <File />
            </div>     {/*-Body-Content-File */}

            <div id="Body-Content-Chat">
              <Chat />
            </div>    {/*-Body-Content-Chat */}

          </div> {/* -Body-Content */}

        </div> {/* -Body */}

      </div>
		);
	}
}

