import React from 'react';
import styles from './individualConvention.scss';

console.log("styles repo", styles)

const iconArray = [ 'glyphicon glyphicon-home', 'glyphicon glyphicon-time', 'glyphicon glyphicon-road' ];

export default function individualConventions(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <span className={iconArray[Math.floor(Math.random()*3)]}></span>

      </div> {/* pic */}

      <div className={[styles.name, 'orange'].join(" ")}>

        <span>{props.name}</span>

      </div> {/* name */}

      <div className={[styles.value, 'green'].join(" ")}>

        <span>{props.value}</span>

      </div> {/* name */}

      <div className={[styles.id, 'grey'].join(" ")}>

        <span>{props.id}</span>

      </div> {/* id */}

      <div className={[styles.update, 'orange'].join(" ")}>

          <div onClick={props.update} className='glyphicon glyphicon-pencil'></div>


      </div> {/* update */}

      <div className={[styles.delete, 'blue'].join(" ")}>

          <div onClick={props.delete} className='glyphicon glyphicon-trash'></div>


      </div> {/* delete */}
    </div>
  )
}
