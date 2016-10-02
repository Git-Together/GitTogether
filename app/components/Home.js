import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import stylesScss from './Home.scss';

console.log("stylesScss", stylesScss)

import IndividualRepo from './individualRepo.js';
import IndividualMember from './individualMember.js';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.display = this.display.bind(this);
  }


  static propTypes = {
    addRepo: PropTypes.func.isRequired,
    removeRepo: PropTypes.func.isRequired,
    addTeamMember: PropTypes.func.isRequired,
    removeTeamMember: PropTypes.func.isRequired,
    refreshTeamMembers: PropTypes.func.isRequired,
    team: PropTypes.array.isRequired,
    repo: PropTypes.array.isRequired
  };

  display (array, type) {
    return array.map(
        e => {
          let displayValue = type === 'repo'? (
            <div key={e.id}>
              <IndividualRepo name={e.name} id={e.id} delete={this.props.removeRepo.bind(this,e.id)} />
            </div>):
            (<div key={e.id}>
              <IndividualMember name={e.name} id={e.id} delete={this.props.removeTeamMember.bind(this,e.id)} />
            </div>)
          return displayValue;
        }
    )
  };

  render() {

    const { addRepo, removeRepo, addTeamMember, removeTeamMember, refreshTeamMembers, team, repo } = this.props;
    let inputRepo;
    let inputMember;

    return (
      <div className={stylesScss.flex}>
        <div className={[stylesScss.teams, 'grey'].join(" ")}>

          <span>Repos and Members</span>

          <div className={[stylesScss.repos, 'green'].join(" ")}>

            <span>Repos</span>
            {this.display(repo, 'repo')}
            <div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!inputRepo.value.trim()) {
                  return
                }
                addRepo({name: inputRepo.value})
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
            {this.display(team, 'team')}
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

          Main View

        </div>{/* main */}

      </div>
    );
  }
}


// export default class Home extends Component {
//   render() {
//     return (
//       <div>
//         <div className={styles.container}>
//           <h2>Home</h2>
//           <div className={stylesScss.test}>test <span>test</span></div>
//           <Link to="/counter">to Counter</Link>
//         </div>
//       </div>
//     );
//   }
// }
