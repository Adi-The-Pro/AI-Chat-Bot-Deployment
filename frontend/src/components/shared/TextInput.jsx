import React from 'react'
import styles from './TextInput.module.css'
export default function TextInput({type,placeholder,onChange}) {
  return (
    <input className={styles.input} onChange={onChange} type={type} placeholder={placeholder}>
    </input>  
  )
}
