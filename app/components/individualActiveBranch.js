import React from 'react';
import styles from './individualActiveBranch.scss';

export default function IndividualActiveBranch(props) {

  return (
    <div className={[styles.flex, 'grey'].join(" ")}>
      <div className={[styles.details, 'yellow'].join(" ")}>
        <div className={[styles.branchName, 'pink'].join(" ")}>
          <h3>Branch Name</h3>
          {props.branch.branchName}
        </div>
        <div className={[styles.id, 'blue'].join(" ")}>
          <h3>Branch Id</h3>
            {props.branch.id}
        </div>
        <div className={[styles.lastUpdated, 'orange'].join(" ")}>
          <h3>Last Updated</h3>
            {props.branch.lastUpdated.toString()}
        </div>
        <div className={[styles.local, 'grey'].join(" ")}>
          <h3>Local?</h3>
            {props.branch.local.toString()}
        </div>
      </div>
      <div className={[styles.comments, 'green'].join(" ")}>
        <h1>Comments</h1>
      </div>
    </div>
  )
}
