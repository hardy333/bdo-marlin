import React from "react";
import { btn, menuUl, btnOpen } from "./asyncMenu.module.css";
import { Menu } from "@szhsin/react-menu";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

import { AnimatePresence, motion } from "framer-motion";
import ArrowSvg from "./ArrowSvg";

const WAITING = "waiting";
const SUCCESS = "success";
const ERROR = "error";

const AsyncMenu = ({
  labelText,
  menuColor,
  isLoading,
  isError,
  menuContent,
  refetch,  
}) => {

let menuStateName = WAITING;

    
  if (isLoading) {
    menuStateName = WAITING;
  } else if (isError) {
    menuStateName = ERROR;
  } else if (menuContent) {
    menuStateName = SUCCESS;
  }

  console.log({menuStateName, menuContent})

  return (
    <Menu
      menuClassName={menuUl}
      align="center"
      gap={0}
      menuButton={({ open }) => {
        return (
          <button
            className={`${btn}  ${open ? btnOpen : ""}`}
            style={{
              color: menuColor,
              backgroundColor: menuColor + "25",
              "--status-color": menuColor,
              marginInline: "auto",
            }}
            onClick={() => refetch()}
          >
            <span style={{ color: menuColor, marginLeft: 5 }}>{labelText}</span>
            <ArrowSvg fill={menuColor} />
          </button>
        );
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={menuStateName}
          style={{width: "100%"}}

        >
          {renderMenuContent(menuStateName, menuColor, menuContent)}
        </motion.div>
      </AnimatePresence>
    </Menu>
  );
};

const renderMenuContent = (menuStateName, menuColor, menuContent) => {
  if (menuStateName === WAITING) {

    return <div style={{marginInline: "auto", display:"grid", alignItems: "center", justifyItems: "center"}}>
    <LoadingSpinner color={menuColor} />
</div>;
  }

  if (menuStateName === SUCCESS) {
    return menuContent;
  }

  if (menuStateName === ERROR) {
    return (
      <p style={{ textAlign: "center", width: 300, maxWidth:"100%" }}>მონაცემების ჩატვირთვა ვერ მოხერხდა. <br /> გთხოვთ სცადეთ მოგვიანებით</p>
    );
  }
};

export default AsyncMenu;
