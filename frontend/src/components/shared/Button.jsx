import React from 'react'
import { CgLogIn } from "react-icons/cg";
import styles from './Button.module.css';
export default function Button({text,onClick}) {
  return (
    <div onClick={onClick} className={styles.cont}>
        <button className={styles.btn}>{text}</button>
        <CgLogIn/>
    </div>
  )
}
