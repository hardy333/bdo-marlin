// import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../axios/axios";
import { useQuery } from "react-query";


const queryFn = async ({queryKey}) => {
    const res = await axiosPrivate.get(`RetroBonusCondition/${queryKey[1]}`)
    

    if(!Array.isArray(res?.data?.data)){
      throw new Error("Something went wrong.")

    } 
    // throw "Hello"
    return res.data.data
}


const useRetroBonusConditions = ({retroBonusId}) => {

    return useQuery({
        queryKey: ["retro-bonus-conditions", retroBonusId],
        queryFn: queryFn,
        select: (data) => {
          return data;
        },
        enabled: false,
        retry: 1
     
      });
    
  
}

export default useRetroBonusConditions