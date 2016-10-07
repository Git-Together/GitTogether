import React from 'react';
import styles from './individualActiveFile.scss';

export default function IndividualActiveFile(props) {

  return (
    <div className={[styles.flex, 'grey'].join(" ")}>
      <div className={[styles.details, 'yellow'].join(" ")}>
        <div className={[styles.fileName, 'pink'].join(" ")}>
          <h1>File Name</h1>
          {props.file.path}
        </div>
        <div className={[styles.id, 'blue'].join(" ")}>
        <h1>File ID</h1>
          {props.file.sha}
        </div>
        <div className={[styles.lastUpdated, 'orange'].join(" ")}>
        <h1>File Date</h1>
        </div>
      </div>
      <div className={[styles.comments, 'green'].join(" ")}>
        <h1>Changes</h1>
        {props.activeEvents()}
      </div>



    </div>
  )
}
