import React from 'react';
import styles from './individualCreateChannel.scss';

// const iconArray = [ 'glyphicon glyphicon-home', 'glyphicon glyphicon-time', 'glyphicon glyphicon-road' ];

export default function individualCreateChannel(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.name, 'blue'].join(" ")}>

        <span>{props.name}</span>

      </div> {/* name */}


      <div className={[styles.update, 'grey'].join(" ")}>
          {props.channelView?
          <div onClick={props.switch} className='glyphicon glyphicon-pencil'></div>:
          <div onClick={props.addChannel} className='btn btn-success'>+</div>
          }


      </div> {/* add */}

      <div className={[styles.delete, 'blue'].join(" ")}>

          <div onClick={props.removeChannel} className='btn btn-danger'>-</div>


      </div> {/* delete */}
    </div>
  )
}
