import "../styles/switch.css";
import "../styles/pag-test.css";
import "../styles/status-component.css";
import "../styles/categories.css";
import "../styles/test.css";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";
export const items = Array.from({ length: 1000 }).map((_, index) => index);

export const items1 = [
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
  "Nachos",
  "Nachos",
  "Nachos",
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
];

export const parentCategories = [
  "Chips",
  "Nacho",
  "Tortia",
  "sunflower Seeds",
  "Popcorn",
  "Crackers",
];

const Test = () => {
  const [selected, setSelected] = useState();

  return (
    <>
      <div className="test-div mt-20 ms-20">
        <div className=" date-picker-wrapper">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </>
  );
};

export default Test;
