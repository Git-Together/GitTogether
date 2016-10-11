import React from 'react';
import styles from './individualActiveRepo.scss';

export default function IndividualActiveRepo (props) {
    return (
    <div className={[styles.flex, 'grey'].join(" ")}>
      <div className={[styles.details, 'yellow'].join(" ")}>
        <div className={[styles.name, 'blue'].join(" ")}>
          <h1>Name</h1>
          {props.repo.name}
        </div>
        <div className={[styles.id, 'pink'].join(" ")}>
        <h1>ID</h1>
          {props.repo.id}
        </div>
      </div>
      <div className={[styles.comments, 'green'].join(" ")}>
        <h1>Comments</h1>
      </div>
    </div>
    )
};
