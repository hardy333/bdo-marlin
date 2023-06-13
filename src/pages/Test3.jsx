import React from "react";
import { useQuery } from "react-query";
import ProgressBar from "../components/ProgressBar";

const url = "https://10.0.0.202:5001/api/OrdersByAccountFront/M00001";

export const getData = (url) => fetch(url).then((res) => res.json());

const Test3 = () => {
  const { isLoading, error, data } = useQuery("repoData", () => getData(url));

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return <div>
    <div className="h-[200px] bg-red-400  ">
     <ProgressBar show={true} />
      
    </div>
  </div>;
};

export default Test3;
