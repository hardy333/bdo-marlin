import React from 'react'

const LazyLoader1 = () => {
  return (
    <>
        <LazyLoader1Line />
    </>

  )
}

export default LazyLoader1


const LazyLoader1Line = () => {

    return <div className="lazy-loader-1-line">
      <span></span>

    </div>
}