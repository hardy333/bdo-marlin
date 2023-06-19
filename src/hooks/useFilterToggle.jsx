import React, { useEffect, useState } from "react";

const useFilterToggle = (isLarge) => {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filterRow = document.querySelector(".ag-header-row-column-filter");
    const header = document.querySelector(".ag-header");

    if (!filterRow) return;

    if (!showFilters) {
      filterRow.style.display = "none";
    } else {
      filterRow.style.display = "block";
    }

    if (!header) return;

    let smallHeight = 49
    let bigHeight = 78
    if(isLarge){
       smallHeight = 95
       bigHeight = 125
    }
    
    if (!showFilters) {
      header.style.height = smallHeight + "px";
      header.style.minHeight = smallHeight + "px";
    } else {
      header.style.height = bigHeight + "px";
      header.style.minHeight = bigHeight + "px";
    }
  });

  return [showFilters, setShowFilters];
};

export default useFilterToggle;
