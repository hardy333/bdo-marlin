import React from "react";
import AsyncMenu from "../asyncMenu/AsyncMenu";
import useRetroBonusConditions from "../../hooks/api/useRetroBonusConditions";
import { menuLi } from "./retroBonusConditionsMenu.module.css";

const defRetroBonusId = "19ac6fd7-7f9e-11e8-80ef-005056b569bf";
// const defRetroBonusId = "9315d188-3871-11ee-8123-005056b5a0aa"; // Empty array example

const RetroBonusConditionsMenu = ({ retroBonusId }) => {
  const { refetch, data, isLoading, isError } = useRetroBonusConditions({
    retroBonusId,
  });

  let menuContent = null;

  if (data && data?.length > 0) {
    menuContent = (
      <>
        {[...data]?.reverse()?.map((condition) => {
          return (
            <li className={`${menuLi}`} key={condition.rangeName}>
              <span>
                {condition.rangeName}, {"    "}
              </span>
              <span style={{ marginLeft: "auto" }}>
                {condition.rangePercent}%{" "}
              </span>
            </li>
          );
        })}
      </>
    );
  }

  if (data?.length === 0) {
    menuContent = (
      <p style={{ textAlign: "center" }}>ბონუსების პირობები არ მოიძებნა.</p>
    );
  }

  return (
    <AsyncMenu
      menuContent={menuContent}
      labelText={"ფასდაკლების პირობები"}
      menuColor={"#6e0ff5"}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default RetroBonusConditionsMenu;
