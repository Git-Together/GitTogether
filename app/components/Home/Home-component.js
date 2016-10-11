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

export default class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
		}
	}

	static propTypes = {

	};

  render() {
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
              <span id="Header-Nav-Text-Welcome">Welcome</span>
              <span id="Header-Nav-Text-UN"><em>Milten Kingil</em></span>
            </div> {/* -Headder-Nav-Text */}
            <div id="Header-Nav-IconBar">
              {
                ['glyphicon glyphicon-eye-open', 'glyphicon glyphicon-cloud-upload', 'glyphicon glyphicon-user', 'glyphicon glyphicon-tasks', 'glyphicon glyphicon-file', 'glyphicon glyphicon-comment']
                .map(e => { return <div key={e} className={`Header-Nav-IconBar-Icons ${e}`} onClick={this.props.toggleComponent.bind(null, 'repos')}></div>})
              }
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
            </div> {/* -Body-Content-Repos */}

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

