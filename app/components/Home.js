import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import stylesScss from './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <div className={stylesScss.flex}>
        <div className={[stylesScss.teams, stylesScss.grey].join(" ")}>
          <span>Repos and Members</span>
          <div className={[stylesScss.repos, stylesScss.green].join(" ")}>
          <span>Repos</span>
          </div>{/* Repos */}
          <div className={[stylesScss.members, stylesScss.purple].join(" ")}>
          <span>Members</span>
          </div>{/* members */}
        </div>{/* teams */}
        <div className={[stylesScss.main, stylesScss.blue].join(" ")}>
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
