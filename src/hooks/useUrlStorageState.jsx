import { useEffect, useState } from 'react'
import { useSearchParams,  } from 'react-router-dom';

const useUrlStorageState = (key, initialValue) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const [value, setValue] = useState(() => {
        let savedValue = searchParams.get(key)
        if(savedValue){
            return savedValue
        }else{
            return initialValue
        }
    })

    useEffect(() => {
        // setSearchParams((x) => {
        //     console.log(x, "params")
        //     x.append(key, value)
        // }) 
        const searchParams  = new URLSearchParams(window.location.search) 
        searchParams.set(key, value)
        window.history.replaceState(null, "", "?"+searchParams.toString())
        
    }, [value, setValue])


    return [value, setValue]
}

export default useUrlStorageState