import React, { useEffect, useState } from 'react'

const useLocalStorage = (key, initVal) => {
    const [value, setValue] = useState(() => {
        const val = window.localStorage.getItem(key)
        if(val){
            return JSON.parse(val)
        }else{
            return initVal
        }
    })
  

    useEffect(() => {

        window.localStorage.setItem(key, JSON.stringify(value))
        
    }, [value, setValue])

    return [value, setValue]
}

export default useLocalStorage