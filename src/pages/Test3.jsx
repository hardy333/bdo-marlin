import React from "react";
import { useQuery } from "react-query";

const url = "https://10.0.0.202:5001/api/CatalogueFront/M00001/4eca0fc3-f307-11ed-8120-005056b5a0aa";

export const getData = (url) => fetch(url).then((res) => res.json());

const Test3 = () => {
  const { isLoading, error, data } = useQuery("repoData", () => getData(url));

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return <div>Test3</div>;
};

export default Test3;
