import React, { useEffect, useState } from "react";

const useOutsidePopupClick = () => {
  const [allowPopup, setAllowpopup] = useState(true);

  useEffect(() => {
    const closePopup = (e) => {
      setAllowpopup(false);
      if (
        !e.target.classList.contains("th-popup-col") ||
        !e.target.classList.contains("sortPopup")
      ) {
        // document.querySelector(".open-popup")?.classList.remove("open-popup");
      }
    };

    window.addEventListener("click", closePopup);

    return () => {
      window.removeEventListener("click", closePopup);
    };
  }, []);

  return [allowPopup, setAllowpopup];
};

export default useOutsidePopupClick;
