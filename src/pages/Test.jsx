import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Switch } from "@mui/material";
import "../styles/switch.css";
import Select from "react-select";

const Test = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  console.log(options);

  return (
    <DashboardLayout>
      <div style={{ paddingLeft: "100px" }}>
        <h2>Select example</h2>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          // isSearchable={false}
          options={options}
          defaultValue={{ value: "vanilla", label: "Vanilla" }}
          styles={{
            control: (baseStyles, state) => {
              console.log(baseStyles);

              return {
                ...baseStyles,
                borderColor: state.isFocused ? "green" : "red",
              };
            },
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Test;
