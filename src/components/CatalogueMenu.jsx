import React, { useEffect, useState } from "react";
import SearchSvg from "./svgs/SearchSvg";

import { BsArrowRightShort } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useQuery } from "react-query";
import { useMemo } from "react";
import { fetchData } from "../utils/fetchData";

const CatalogueMenu = ({ changeAllData, setSubCatId }) => {
  // Selected category, sub category
  const [selectedCategory, setSelectedCategory] = useState("სასუსნავები");
  const [selectedProduct, setSelectedProduct] = useState("ჩიფსი");
  // ....
  const [isOutsideWrapper, setIsOutsideWrapper] = useState(true);
  // Search values
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [subCategorySearchValue, setSubCategorySearchValue] = useState("");

  // Events
  const handleMouseOver = (e) => {
    if (e.target.classList.contains("category-li")) {
      const span = e.target.querySelector(".category-name");
      const cat = span.getAttribute("data-value");
      setSelectedCategory(cat);
    }
  };

  const handleMouseLeave = (e) => {
    setIsOutsideWrapper(true);
  };

  const handleMouseEnter = (e) => {
    setIsOutsideWrapper(false);
  };

  const handleProductClick = (e, name) => {
    setIsOutsideWrapper(true);
    setSelectedProduct(name);

    // console.log(resArr)
    // console.log(selectedCategory)

    const id = resArr
      .find((obj) => obj.name === selectedCategory)
      .children.find((obj) => obj.name === name).categoryid;

    setSubCatId(id);

    if (changeAllData) {
      changeAllData();
    }
  };

  // ------------------------ //

  const url =
    "https://10.0.0.202:5001/api/ProductCategories?page=1&pageSize=182";

  const { isLoading, error, data } = useQuery("catalogueMenuData", () =>
    fetchData(url)
  );

  const resArr = useMemo(() => {
    if (!data) return;
    const { data: catData } = data;
    const resObj = {};
    const resArr = [];

    catData.forEach((obj) => {
      if (obj.name === "ჩიფსი") {
      }
      if (obj.parentFolder === "") {
        resObj[obj.categoryid] = obj;
        resObj[obj.categoryid].children = [];
      } else {
        if (!resObj[obj.parentFolder]) {
          const parentObj = catData.find(
            (obj) => obj.categoryId === obj.parentFolder
          );
          if (parentObj) {
            resObj[obj.parentFolder] = parentObj;
          }
          if (resObj[obj.parentFolder]) {
            resObj[obj.parentFolder].children = [obj];
          }
        } else {
          resObj[obj.parentFolder].children.push(obj);
        }
      }
    });

    for (let [key, value] of Object.entries(resObj)) {
      resArr.push(value);
    }

    return resArr;
  }, [data]);

  // const [rowData, setRowData] = useState(() => {
  //   if (data || data?.data) {
  //     return data.data;
  //   }
  //   return null;
  // });

  // ------------------------ //

  let arrLeft = [];
  let arrRight = [];

  if (resArr && selectedCategory) {
    resArr
      .find((obj) => obj.name === selectedCategory)
      ?.children.filter((obj) => obj.name.includes(subCategorySearchValue))
      .forEach((obj, index) => {
        if (index % 2 === 0) {
          arrLeft.push(obj);
        } else {
          arrRight.push(obj);
        }
      });
  }

  return (
    <div
      className="catalogue-menu-wrapper"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        width: isOutsideWrapper ? "200px" : "850px",
      }}
    >
      <section className="catalogue-menu-list-1">
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            value={categorySearchValue}
            onChange={(e) => setCategorySearchValue(e.target.value)}
          />
          <SearchSvg />
        </div>
        <ul onMouseMove={handleMouseOver}>
          {resArr
            ?.filter((catObj) => catObj.name.includes(categorySearchValue))
            .map((catObj, i) => (
              <li
                className={`category-li ${
                  selectedCategory === catObj.name ? "active" : ""
                }`}
                key={i}
              >
                <span className="category-name" data-value={catObj.name}>
                  {catObj.name}
                </span>
                <span className="category-arrow">
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
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            value={subCategorySearchValue}
            onChange={(e) => setSubCategorySearchValue(e.target.value)}
          />
          <SearchSvg />
        </div>
        <div className="catalogue-menu-list-2__list-wrapper">
          <ul className="left">
            {arrLeft.map((subCatObj, index) => {
              return (
                <li
                  onClick={(e) => handleProductClick(e, subCatObj.name)}
                  key={subCatObj.name + index}
                  style={{
                    color: subCatObj.name === selectedProduct ? "#6E0FF5" : "",
                  }}
                >
                  {subCatObj.name}
                </li>
              );
            })}
          </ul>
          <ul className="right">
            {arrRight.map((subCatObj, index) => {
              return (
                <li
                  onClick={(e) => handleProductClick(e, subCatObj.name)}
                  key={subCatObj.name + index}
                  data-hello="Hello"
                  style={{
                    color: subCatObj.name === selectedProduct ? "#6E0FF5" : "",
                  }}
                >
                  {subCatObj.name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CatalogueMenu;
