import React, { useState } from "react";
import SearchSvg from "./svgs/SearchSvg";

import { BsArrowRightShort } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

const CatalogueMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOutsideWrapper, setIsOutsideWrapper] = useState(true);

  const handleMouseOver = (e) => {
    if (e.target.classList.contains("category-li")) {
      const cat = e.target.textContent;
      setSelectedCategory(cat);
    }
  };

  const handleMouseLeave = (e) => {
    setIsOutsideWrapper(true);
    setSelectedCategory(null);
  };

  const handleMouseEnter = (e) => {
    setIsOutsideWrapper(false);
  };

  return (
    <div
      className="catalogue-menu-wrapper"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        width: isOutsideWrapper ? "200px" : "650px",
      }}
    >
      <section className="catalogue-menu-list-1">
        <div className="input-wrapper">
          <input type="text" className="input" />
          <SearchSvg />
        </div>
        <ul onMouseOver={handleMouseOver}>
          {Array.from({ length: 200 }).map((_, i) => (
            <li
              className="category-li"
              key={i}
              style={{
                background:
                  i === +selectedCategory?.split(" ")[1] ? "#d0c7e85d" : "",
              }}
            >
              Hello {i}
              <span
                style={{
                  display:
                    i === +selectedCategory?.split(" ")[1] ? "block" : "none",
                }}
              >
                <BsArrowRightShort />
              </span>
            </li>
          ))}
        </ul>
        <div className="catalogue-menu-footer">
          <p>
            View full structure <MdKeyboardArrowRight />
          </p>
        </div>
      </section>
      <section
        className={`catalogue-menu-list-2 ${isOutsideWrapper ? "" : "open"}`}
      >
        <ul>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} abc sbs </li>
          <li>Hello {selectedCategory?.split(" ")[1]} Hello</li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
        </ul>

        <ul>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} param pam</li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
        </ul>

        <ul>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
          <li>Hello {selectedCategory?.split(" ")[1]} </li>
        </ul>
      </section>
    </div>
  );
};

export default CatalogueMenu;
