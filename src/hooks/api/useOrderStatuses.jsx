// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "react-query";

import { axiosPrivate } from "../../axios/axios";

const defaultOrderId = "37480a56-df52-4688-ae45-5af19d98d322";

const queryFn = async ({queryKey}) => {
    const res = await axiosPrivate.get(`StatusResultFront/${queryKey[1]}`)
    

    if(!Array.isArray(res?.data?.data)){
      throw new Error("Something went wrong.")

    } 
    // throw "Hello"
    return res.data.data
}



const useOrderStatuses = (orderID = defaultOrderId) => {
  return useQuery({
    queryKey: ["order-statuses", orderID],
    queryFn: queryFn,
    select: (data) => {
      return data;
    },
    enabled: false,
    retry: 1
 
  });
};

export default useOrderStatuses;
