import React from 'react';
import styles from './individualMessage.scss';

export default function IndividualMessage(props) {
  return (

          <div className={styles.flex}>
            <div className={[styles.userId, 'grey'].join(' ')}>
              <span >{props.userId}</span>
            </div>
            <div className={[styles.message, 'blue'].join(' ')}>
              <span>{props.message}</span>
            </div>
            <div className={[styles.timeStamp, 'green'].join(' ')}>
              <span>{props.timeStamp.toString()}</span>
            </div>

          </div>

      );
}
