import React from 'react';
import styles from './individualCheckout.scss';

export default function IndividualCheckout(props){
  return (

   <div className={styles.flex}>
    <div className={[styles.userName, 'orange'].join(' ')}>
        <span>{props.userName}</span>
    </div>

    <div className={[styles.fileId, 'green'].join(' ')}>
      <span>{props.fileId}</span>
    </div>

    <div>
      <span>{props.timeStamp.toString()}</span>
    </div>

   </div>
  )
}
