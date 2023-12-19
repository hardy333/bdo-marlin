import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "react-day-picker/dist/style.css";
import { useStopwatch } from "react-timer-hook";
import OrderStatusMenu from "../components/orderStatusMenu/OrderStatusMenu";

export const getDataFetch = (url) => {

  const user = JSON.parse(window.localStorage.getItem("user"))

  return fetch(url, {
      headers: {'Authorization': `bearer ${user.token}`},
  
  }).then(res => {
    console.log(res)
    if(!res.ok){
      throw new Error("errrrrrrrrror")
    }

    console.log(111)

    return res.json()
  })
}


export const getDataAxios = (url) => {

  const user = JSON.parse(window.localStorage.getItem("user"))

  return axios.get(url, {
      headers: {'Authorization': `bearer ${user.token}`},
  
  })
}

const url = "https://api.marlin.ge/api/AccountDataFront"

const Test = () => {
  
  const handleFetch = async () => {
    try{
      const x = await getDataFetch(url)
      console.log(x)

    }catch(err){
      console.log(err)

    }
 

  }

  const handleAxios = async () => {
    try{
      const x = await getDataAxios(url)
      console.log(x)

    }catch(err){
      console.log(err)

    }
   

  }


  return (
    <div>
      <button style={{border: "1px solid red", padding: "10px", margin: "10px"}} onClick={() => handleAxios()}>axios get</button>
      <button style={{border: "1px solid red", padding: "10px", margin: "10px"}} onClick={() => handleFetch()}>fetch get</button>
      <p id="text-test">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, sequi laboriosam soluta, explicabo neque maiores quia, atque dolorum consequatur suscipit quidem reiciendis eius assumenda repellendus laudantium? Excepturi veritatis est deleniti?
        
      </p>

      <OrderStatusMenu statusName={"გაგზავნილია"}  orderID={"jhdkjdhkj"}/>
      
      
    </div>
  );
};

export default Test;
