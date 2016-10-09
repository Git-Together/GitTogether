import React from 'react';
import styles from './individualCollab.scss';
import { Link } from 'react-router';


const iconArray = [ 'glyphicon glyphicon-book', 'glyphicon glyphicon-print', 'glyphicon glyphicon-camera' ];

export default function IndividualCollab(props) {
  return (
    <div className={styles.flex}>
      <div className={[styles.pic, 'grey'].join(" ")}>

        <span className={iconArray[Math.floor(Math.random()*3)]}></span>

      </div> {/* pic */}

      <div className={[styles.name, 'blue'].join(" ")}>

        <span>{props.name}</span>

      </div> {/* name */}

      <div className={[styles.id, 'pink'].join(" ")}>

        {/*<span>{props.id}</span>*/}

      </div> {/* id */}

      <div className={[styles.edit, 'orange'].join(" ")}>

          <span onClick={props.addTeamMember} className='glyphicon glyphicon-plus'></span>


      </div> {/* update */}

      <div className={[styles.delete, 'blue'].join(" ")}>
        <Link className="dark button" to="/">
          <div onClick={props.delete} className='glyphicon glyphicon-trash'></div>
        </Link>

      </div> {/* delete */}
    </div>
  )
}
