import React, {useState} from 'react'
import {motion} from "framer-motion"
import { useStateManager } from 'react-select'

const variants = {
    initial: {
        opacity: 0,
        y: 10

    },
    animate: (custom) => ({
        opacity: 1,
        transition: {delay: custom * 0.1}

    }),
    exit: {
        opacity: 1,
        y: 10

    }
}

const RightChartBubbles = () => {
    const [smallCircles] = useState([1,2,3,4])
    
  return (
    <div className='right-chart-buttons'>
        <div className="left">
            <div className='c-big c-big-1'></div>
            <div className='c-big c-big-2'></div>
            <div className='c-big c-big-3'></div>
            <div className='c-big c-big-4'></div>
        </div>
        <div className="right">
            <ul>
                {
                    smallCircles.map(num => (
                        <motion.li 
                key={num}
                custom={num - 1}
                variants={variants}
                animate="animate"
                initial="initial"
                exit="exit"
                 className={`c-small-li c-small-li-${num}`}>
                    <span className={`c-small c-small-${num}`}></span>
                    <span>მომწოდებელი {num}</span>
                </motion.li>
                    ))
                }
                
            </ul>
        </div>
    </div>
  )
}

export default RightChartBubbles