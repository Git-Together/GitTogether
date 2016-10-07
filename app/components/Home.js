import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import stylesScss from './Home.scss';
import * as ChannelActions from '../actions/channels.js'
import Promise from 'bluebird';
const storage = Promise.promisifyAll(require('electron-json-storage'))
import IndividualRepo from './individualRepo.js';
import IndividualCreateChannel from './individualCreateChannel.js';
import IndividualMember from './individualMember.js';
import Dashboard from './Dashboard.js';
import Repos from './Repos.js';
import Chat from './Chat.js';
import Team from './Team.js';
import Conventions from './Conventions.js';
import CreateChannel from './CreateChannel.js';
import Branches from './Branches.js';
import FileView from './FileView.js';
import Settings from './Settings.js';
import { fileWatcher } from '../utils/file-watch.js';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.display = this.display.bind(this);
    this.state = {
      repos: []
    }
  }

  static propTypes = {
	loadChannels: PropTypes.func.isRequired,
    addRepo: PropTypes.func.isRequired,
    removeRepo: PropTypes.func.isRequired,
    addTeamMember: PropTypes.func.isRequired,
    removeTeamMember: PropTypes.func.isRequired,
	  refreshTeamMembers: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
    repo: PropTypes.object.isRequired,
	  ui: PropTypes.string.isRequired,
	  auth: PropTypes.object.isRequired
  };

  display (array, type) {
	let counter = 0
    return array.map(
        e => {
		  counter++
          let displayValue = type === 'channels'? (
            <div key={counter}>
              <IndividualCreateChannel name={e} addChannel={this.props.addChannel.bind(this,e)}
                removeChannel={this.props.removeChannel.bind(this,e)} switch={this.props.getRepoTree.bind(this, e)}
                channelView={true}
                />
            </div>):
            (<div key={e.id}>
              <IndividualMember name={e.name} id={e.id} delete={this.props.removeTeamMember.bind(this,e.id)} />
            </div>)
          return displayValue;
        }
    )
  };

  componentWillMount(){
	fileWatcher()
	this.props.loadChannels()
    this.props.getUserRepos()
  };

  componentWillReceiveProps(nextProps){
    fileWatcher();
    this.setState({
      repos: nextProps.repo.repos
    })
  };

  render() {
    const { getRepoTree, switchActive, addRepo, removeRepo, getUserRepos,addTeamMember, removeTeamMember, refreshTeamMembers, changeActiveTeamMember, team, repo } = this.props;
    const { toggleComponent, ui } = this.props;
    const { logout, auth } = this.props;
    const { updateSettings, addSettings, removeSettings, refreshSettings, settings } = this.props;
    const { updateConventions, addConventions, removeConventions, refreshConventions, conventions } = this.props;
    const { changeActiveFile,  refreshFiles, changeActiveFileAsync, files } = this.props;
    const { changeActiveBranch,  refreshBranches, branches } = this.props;
    const { postMessage, refreshMessages, changeActiveMessage, chat } = this.props;
    const { addChannel, removeChannel, loadChannels, channels } = this.props;
    const { addComment, editComment, removeComment} = this.props;
    const { checkoutFile, returnFile, checkoutList } = this.props;
    const { checkoutFile, unsubscribe, checkoutList } = this.props;


    let uiSwitch;
    let inputRepo;
    let inputMember;

    return (
      <div className={stylesScss.flex}>
        <div className={[stylesScss.teams, 'grey'].join(" ")}>

          <span>Current Channel</span>

          <div className={[stylesScss.repos, 'green'].join(" ")}>

            <span>Channels</span>
            {channels?this.display(channels, 'channels'):''}
            <div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!inputRepo.value.trim()) {
                  return
                }
                addRepo({name: inputRepo.value, type: 'document'})
                inputRepo.value = ''
              }}>
                <input style={{color:"black"}}ref={node => {
                  inputRepo = node
                }} />
                <button className='btn btn-default' type="submit">
                  Add Repo
                </button>
              </form>
            </div>

          </div>{/* repos */}

          <div className={[stylesScss.members, 'orange'].join(" ")}>

            <span>Team</span>
            {this.display(team.team, 'team')}
            <div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!inputMember.value.trim()) {
                  return
                }
                addTeamMember({name: inputMember.value})
                inputMember.value = ''
              }}>
                <input style={{color:"black"}}ref={node => {
                  inputMember = node
                }} />
                <button className='btn btn-default' type="submit">
                  Add Member
                </button>
              </form>
            </div>

          </div>{/* members */}

        </div>{/* teams */}

        <div className={[stylesScss.main, 'blue'].join(" ")}>

          <div className={[stylesScss.nav, 'pink'].join(" ")}>
            <ul>
              <li onClick={toggleComponent.bind(null,'Dashboard')}
                className="btn">Dashboard
              </li>
              <li onClick={toggleComponent.bind(null,'Repo View')}
                className="btn">Repo View
              </li>
              <li onClick={toggleComponent.bind(null,'Chat')}
                className="btn">Chat
              </li>
              <li onClick={toggleComponent.bind(null,'Team')}
                className="btn">Team
              </li>
              <li onClick={toggleComponent.bind(null,'Channel')}
                className="btn">New Channel
              </li>
              <li onClick={toggleComponent.bind(null,'Branches')}
                className="btn">Branches
              </li>
              <li onClick={toggleComponent.bind(null,'FileView')}
                className="btn">File View
              </li>
              <li onClick={toggleComponent.bind(null,'Settings')}
                className="btn">Settings
              </li>
              <li onClick={logout}
                className="btn">Logout
              </li>
            </ul>
          </div>{/* nav */}

          <div className={[stylesScss.uiSwitch, 'pink'].join(" ")}>
            { (() => {
                    switch (ui) {
                      case 'Dashboard':
                        return <Dashboard
                          repo = {repo}
                          checkoutList = {checkoutList}
                          unsubscribe = {unsubscribe}
                        />;
                      case 'Repo View':
                        return <Repos
                          repos={this.props.repo.tree.tree}
                          changeActiveFileAsync={changeActiveFileAsync}
                        />;
                      case 'Chat':
                        return <Chat
                          postMessage = {postMessage}
                          refreshMessages = {refreshMessages}
                          changeActiveMessage = {changeActiveMessage}
                          chat = {chat}
                        />;
                      case 'Team':
                        return <Team
                          delete = {removeTeamMember}
                          changeActiveTeamMember = {changeActiveTeamMember}
                          team = {team.team}
                          activeTeamMember = {team.activeTeamMember}
                        />;
                      case 'Channel':
                        return <CreateChannel
                          addChannel = {addChannel}
                          removeChannel = {removeChannel}
                          repos = {this.props.repo.repos}
                          getUserRepos = {getUserRepos}
                        />;
                      case 'Branches':
                       return <Branches
                        refreshBranches = {refreshBranches}
                        changeActiveBranch = {changeActiveBranch}
                        branches = {branches.branches}
                        activeBranch = {branches.activeBranch}
                       />;
                      case 'FileView':
                        return <FileView
                          refreshFiles = {refreshFiles}
                          changeActiveFile = {changeActiveFile}
                          files = {this.props.repo.tree.tree}
                          activeFile = {files.activeFile}
                          addComment= {addComment}
                          editComment = {editComment}
                          removeComment = {removeComment}
                          checkoutFile = {checkoutFile}
                          unsubscribe = {unsubscribe}
                          auth = {auth}
                          checkoutList = {checkoutList}
                          repo = {repo}
                          changeActiveFileAsync = {changeActiveFileAsync}
                          activeEvents = {files.activeEvents}
                        />;
                      case 'Settings':
                        return <Settings
                         updateSettings = {updateSettings}
                         addSettings = {addSettings}
                         removeSettings = {removeSettings}
                         refreshSettings = {refreshSettings}
                         settings= {settings}
                        />;
                      default:
                        return <Dashboard />;
                    }
                })()
            }

          </div>

        </div>{/* main */}

      </div>
    );
  }
}

