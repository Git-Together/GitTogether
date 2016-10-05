import React from 'react';
import styles from './individualRepo.scss';
import { Link } from 'react-router';

console.log("styles repo", styles)

const iconArray = [ 'glyphicon glyphicon-home', 'glyphicon glyphicon-time', 'glyphicon glyphicon-road' ];

export default function IndividualRepo(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <button className={iconArray[Math.floor(Math.random()*3)]} onClick={props.switch}></button>

      </div> {/* pic */}

      <div className={[styles.name, 'orange'].join(" ")}>

        <span>{props.name}</span>

      </div> {/* name */}

      <div className={[styles.id, 'pink'].join(" ")}>

        <span>{props.id}</span>

      </div> {/* id */}

      <div className={[styles.delete, 'blue'].join(" ")}>
        <Link className="dark button" to="/">
          <div onClick={props.delete} className='glyphicon glyphicon-trash'></div>
        </Link>

      </div> {/* delete */}
    </div>
  )
}
