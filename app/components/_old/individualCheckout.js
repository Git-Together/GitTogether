import React from 'react';
import styles from './individualCheckout.scss';

export default function IndividualCheckout(props){
  return (

   <div className={styles.flex}>

    <div className={[styles.fileId, 'green'].join(' ')}>
      <span>{props.fileId}</span>
    </div>

    <div className={[styles.timeStamp, 'grey'].join(' ')}>
      <span>{props.timeStamp.toString()}</span>
    </div>

    <div className={[styles.unsubscribe, 'blue'].join(' ')}>
      <button onClick={props.unsubscribe} className="glyphicon glyphicon-remove"></button>
    </div>

   </div>
  )
}
