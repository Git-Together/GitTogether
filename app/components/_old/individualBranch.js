import React from 'react';
import styles from './individualBranch.scss';

const iconArray = [ 'glyphicon glyphicon-home', 'glyphicon glyphicon-time', 'glyphicon glyphicon-road' ];

export default function individualBranch(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <span className={iconArray[Math.floor(Math.random()*3)]}></span>

      </div> {/* pic */}

      <div className={[styles.name, 'orange'].join(" ")}>

        <span>{props.branchName}</span>

      </div> {/* name */}

      <div className={[styles.value, 'green'].join(" ")}>

        <span>{props.lastUpdated.toString()}</span>

      </div> {/* value */}

      <div className={[styles.local, 'orange'].join(" ")}>

        <span>{props.local.toString()}</span>

      </div> {/* local */}

      <div className={[styles.id, 'grey'].join(" ")}>

        <span>{props.id}</span>

      </div> {/* id */}

      <div className={[styles.update, 'orange'].join(" ")}>

          <div onClick={props.changeActiveBranch} className='glyphicon glyphicon-pencil'></div>


      </div> {/* update */}

    </div>
  )
}
