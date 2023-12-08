import React, { useState } from "react";

import { useQuery } from "react-query";
import { useMemo } from "react";
import { fetchData } from "../utils/fetchData";
import "../styles/mobile-catalogue-menu.css";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { useEffect } from "react";
import catalogueData from "../data/catalogue-menu-data";
import { useAuthContext } from "../hooks/useAuthContext";

const MobileCatalogueMenu = ({
  setShowCatalogue,
  changeAllData,
  setSubCatId,
  setCat,
  setProd,
}) => {
  // Selected category, sub category
  const [selectedCategory, setSelectedCategory] = useState("სასუსნავები");
  const [selectedProduct, setSelectedProduct] = useState("ჩიფსი");
  // Search values
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [subCategorySearchValue, setSubCategorySearchValue] = useState("");

  // ------------------------ //

  // const url =
  //   "https://10.0.0.202:5001/api/ProductCategories?page=1&pageSize=182";
  const {user} = useAuthContext()

  


    const url = `https://api.marlin.ge/api/ProductCategories?AccountID=${user.decodedToken.AccountID}`;
    

  const { isLoading, error, data } = useQuery("catalogueMenuData", () =>
    fetchData(url)
  );

  const resArr = useMemo(() => {
    let catData = null;
    if (!data) {
      catData = catalogueData;
    } else {
      catData = data.data;
    }

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

  const [showSubCategory, setShowSubCategory] = useState(false);

  const handleProductClick = (e, productName) => {
    setSelectedProduct(productName);
    setShowCatalogue(false);
    setShowSubCategory(false);

    //
    const id = resArr
      .find((obj) => obj.name === selectedCategory)
      .children.find((obj) => obj.name === productName).categoryid;

    setSubCatId(id);

    setCat(selectedCategory);
    setProd(productName);
  };

  useEffect(() => {
    const closeCatalogueMenu = (e) => {
      if (e.code === "Escape") {
        setShowCatalogue(false);
      }
    };

    window.addEventListener("keydown", closeCatalogueMenu);

    return () => {
      window.removeEventListener("keydown", closeCatalogueMenu);
    };
  }, []);

  return (
    <div
      className={`mobile-catalogue-menu ${
        showSubCategory ? "show-sub-category" : ""
      }`}
    >
      {/* Main List */}
      <ul className="category-container">
        <li className="back-item" onClick={() => setShowCatalogue(false)}>
          <span className="back-item-arrow">
            <BsArrowLeftShort />
          </span>
          <span className="back-item-label"> უკან </span>
        </li>
        {resArr
          ?.filter((catObj) => catObj.name.includes(categorySearchValue))
          .map((catObj, i) => (
            <li
              className={`category-li ${
                selectedCategory === catObj.name ? "active" : ""
              }`}
              key={i}
              onClick={() => {
                setSelectedCategory(catObj.name);
                setShowSubCategory(true);
              }}
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

      {/* Sub Category */}
      <div
        className={`sub-category-container ${showSubCategory ? "show" : ""}`}
      >
        <li className="back-item" onClick={() => setShowSubCategory(false)}>
          <span className="back-item-arrow">
            <BsArrowLeftShort />
          </span>
          <span className="back-item-label"> {selectedCategory} </span>
        </li>
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
    </div>
  );
};

export default MobileCatalogueMenu;
