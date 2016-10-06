import React from 'react';
import styles from './individualFile.scss';

const iconArray = [ 'glyphicon glyphicon-home', 'glyphicon glyphicon-time', 'glyphicon glyphicon-road' ];

export default function individualSettings(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <span className={iconArray[Math.floor(Math.random()*3)]}></span>

      </div> {/* pic */}

      <div className={[styles.name, 'orange'].join(" ")}>

        <span>{props.fileName}</span>

      </div> {/* name */}

      <div className={[styles.value, 'green'].join(" ")}>

      </div> {/* name */}

      <div className={[styles.id, 'grey'].join(" ")}>

        <span>{props.id}</span>

      </div> {/* id */}

      <div className={[styles.update, 'orange'].join(" ")}>

          <div onClick={props.changeActiveFile} className='glyphicon glyphicon-pencil'></div>


      </div> {/* update */}

    </div>
  )
}
