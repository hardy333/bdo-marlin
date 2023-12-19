import React from 'react'
import styles from "./loadingSpinner.module.css"


const LoadingSpinner = ({color, size}) => {
  
  
  return (
    <div className={`${styles.loadingSpinner} ${styles[size]}`} style={{borderColor: color ? color : "#333"}} ></div>
  )
}

export default LoadingSpinner