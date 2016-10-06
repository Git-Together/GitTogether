import React from 'react';
import styles from './individualActiveFile.scss';

export default function IndividualActiveFile(props) {
  return (
    <div className={[styles.flex, 'grey'].join(" ")}>
      <div className={[styles.details, 'yellow'].join(" ")}>
        <div className={[styles.name, 'pink'].join(" ")}>
          <h1>Name</h1>
          {props.member.name}
        </div>
        <div className={[styles.id, 'blue'].join(" ")}>
        <h1>ID</h1>
          {props.member.id}
        </div>
      </div>
      <div className={[styles.comments, 'green'].join(" ")}>
        <h1>Comments</h1>
      </div>



    </div>
  )
}
