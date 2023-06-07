import React from "react";
import { useQuery } from "react-query";

const url = "https://jsonplaceholder.typicode.com/todos";

const getData = () => fetch(url).then((res) => res.json());

const Test3 = () => {
  const { isLoading, error, data } = useQuery("repoData", getData);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return <div>Test3</div>;
};

export default Test3;
