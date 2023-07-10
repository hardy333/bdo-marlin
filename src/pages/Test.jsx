import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Test = () => {
  const [selected, setSelected] = React.useState();

  return (
    <div>
      <h2>Hello</h2>
      <DayPicker 
      mode="single" 
      selected={selected} 
      onSelect={setSelected}
      showOutsideDays={true}
      
       />
    </div>
  );
};

export default Test;
