import React from 'react'
import styles from './Logo.module.css';
import {Link} from 'react-router-dom';

export default function Logo() {
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <img src="openai.png" alt="openai" width={'30px'} height={'30px'} className="image-inverted"/>
        <span className={styles.heading}>MERN-AI</span>
      </Link>
    </div>
  )
}
