import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './Home.scss';
import Promise from 'bluebird';

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
      <div id='Container'> {/* +Container */}

        <div id="Header">  {/* +Header */}

          <div id="Header-Logo">  {/* +Header-Logo */}

            <div id="Header-Logo-Image">  {/* +Header-Logo-Image */}
              <span id="Header-Logo-Image-Git">Git</span>
              <span id="Header-Logo-Image-Together"><em>Together</em></span>
            </div> {/* -Header-Logo-Image */}

          </div> {/* -Header-Logo */}
          <div id="Header-Nav">  {/* +Header-Nav */}

            <div id="Header-Nav-Text">  {/* +Header-Nav-Text */}
              Header Nav Text
            </div> {/* -Headder-Nav-Text */}
            <div id="Header-Nav-IconBar">  {/* +Header-Nav-IconBar */}
              Header Nav IconBar
            </div> {/* -Header-Nav-IconBar */}

          </div> {/* -Header-Nav */}

        </div> {/* -Header */}

        <div id="Body">  {/* +Body */}

          <div id="Body-RepoTeam">  {/* +Body-RepoTeam */}

            <div id="Body-RepoTeam-Repo">  {/* +Body-RepoTeam-Repo */}
              Body-RepoTeam-Repo
            </div> {/* -Body-RepoTeam-Repo */}
            <div id="Body-RepoTeam-Team">  {/* +Body-RepoTeam-Team */}
              Body-RepoTeam-Team
            </div> {/* -Body-RepoTeam-Team */}

          </div> {/* -Body-RepoTeam */}
          <div id="Body-Content">  {/* +Body-Content  */}

            <div id="Body-Content-Watch">  {/* +Body-Content-Watch */}
              Body-Content-Watch
            </div> {/* -Body-Content-Watch */}
            <div id="Body-Content-Repo">  {/* +Body-Content-Repo */}
              Body-Content-Repo
            </div> {/* -Body-Content-Repo */}
            <div id="Body-Content-Member">  {/* +Body-Content-Member */}
              Body-Content-Member
            </div> {/* -Body-Content-Member */}
            <div id="Body-Content-Channel">  {/* +Body-Content-Channel */}
              Body-Content-Channel
            </div> {/* -Body-Content-Channel */}
            <div id="Body-Content-File">  {/* +Body-Content-File */}
              Body-Content-File
            </div> {/* -Body-Content-File */}
            <div id="Body-Content-Chat">  {/* +Body-Content-Chat */}
              Body-Content-Chat
            </div> {/* -Body-Content-Chat */}

          </div> {/* -Body-Content */}

        </div> {/* -Body */}

      </div>
		);
	}
}

