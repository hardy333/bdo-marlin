// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosPrivate } from "../../axios/axios";
import { useQuery } from "react-query";


const queryFn = async ({queryKey}) => {


  const user = JSON.parse(window.localStorage.getItem("user"));
  const url = `https://api.marlin.ge/api/RetroBonusCondition/${queryKey[1]}`;

  const res = await axios.get(url, {
    headers: { Authorization: `bearer ${user?.token}` },
  });

    

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