import React from 'react'
import "../styles/progress-bar.css"

const ProgressBar = ({show}) => {
  return (
    <div className="progress-bar" style={{display: !show ? "none" : ""}}>
    <span></span>
  </div>
  )
}

export default ProgressBar