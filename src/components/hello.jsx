import { useReducedMotion } from 'framer-motion';
import React, { useReducer, useState } from 'react'


const counterReducer = (state, action) => {
    switch(action.type){
        case "add":
            return state + 1;
        case "add2":
            return state  + 2;
        case "add3":
            return state + 3;
        default:
            return state
    }

}


const Hello = () => {
    const [state, setState] = useState(100)

    const [counter, dispatch] = useReducer(counterReducer, 10)
    
    console.log(counter, dispatch)

    const handleClick = () => {
        console.log(20)
    }
    
  return (
    <div>
        <h2>Hello
            <button onClick={handleClick}>20</button>
            <p>{state}</p>
        </h2>
    </div>
  )
}

export default Hello