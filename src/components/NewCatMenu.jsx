import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { BsArrowRightShort } from "react-icons/bs";

// Datas
// import { data } from "./data.js";
// import foodmartData from "./foodmart.json";
// import gdmData from "./gdm.json";
// import pepsiData from "./pepsi.json";
// import deilyData from "./deily.json";

// CSS
import "../styles/new-cat-menu.css";

import createTree from "../utils/createTree.js";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData.js";
import Tippy from "@tippyjs/react";
import SearchSvg from "./svgs/SearchSvg.jsx";

// const resArr = createTree(gdmData);

function NewCatMenu({ setSubCatId, isMyProducts, selectedVendor }) {
  const { user } = useAuthContext();

  const url = `https://api.marlin.ge/api/ProductCategories?AccountID=${
    isMyProducts ? user.decodedToken.AccountID : selectedVendor.accountID
  }`;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["new-cat-menu-data", isMyProducts, selectedVendor?.accountID],
    queryFn: () => fetchData(url),
    onSuccess: (data) => {
      const resArr = createTree(data);
      console.log("succcesssssss")
      setArr1(resArr);
    },  
    select: (data) => {
      return data.data;
    },
  });

  //   useEffect(() => {
  //     if(!data) return;
  //     if(arr1.length > 0) return

  //     const resArr = createTree(data);
  //     setArr1(resArr)

  //   }, [data])

//   useEffect(() => {
//     refetch();
//   }, [isMyProducts, selectedVendor]);

  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [arr4, setArr4] = useState([]);
  const [arr5, setArr5] = useState([]);

  const [column2IsOpen, setColumn2IsOpen] = useState(false);
  const [column3IsOpen, setColumn3IsOpen] = useState(false);
  const [column4IsOpen, setColumn4IsOpen] = useState(false);
  const [column5IsOpen, setColumn5IsOpen] = useState(false);

  const [selectedLvl1Name, setSelectedLvl1Name] = useState("");
  const [selectedLvl2Name, setSelectedLvl2Name] = useState("");
  const [selectedLvl3Name, setSelectedLvl3Name] = useState("");
  const [selectedLvl4Name, setSelectedLvl4Name] = useState("");
  const [selectedLvl5Name, setSelectedLvl5Name] = useState("");

  const [selectedLevelNames, setSelectedLevelNames] = useState({
    level1: "",
    level2: "",
    level3: "",
    level4: "",
    level5: "",
  });

  const [selectedCatId, setSelectedCatId] = useState("");

  const [hoverdLvl1Name, setHoveredLvl1Name] = useState("");
  const [hoverdLvl2Name, setHoveredLvl2Name] = useState("");
  const [hoverdLvl3Name, setHoveredLvl3Name] = useState("");
  const [hoverdLvl4Name, setHoveredLvl4Name] = useState("");
  const [hoverdLvl5Name, setHoveredLvl5Name] = useState("");


  // const setArr2Ul = (obj) => {
  //   copy(obj.categoryID);
  //   setArr2([...obj.children]);
  //   setArr3([]);
  //   setArr4([]);
  // };

  // const setArr3Ul = (obj) => {
  //   copy(obj.categoryID);
  //   setArr3([...obj.children]);
  //   setArr4([]);
  // };

  // const setArr4Ul = (obj) => {
  //   copy(obj.categoryID);
  //   setArr4([...obj.children]);
  // };

  const closeAllColumns = () => {
    setColumn2IsOpen(false);
    setColumn3IsOpen(false);
    setColumn4IsOpen(false);
    setColumn5IsOpen(false);
  };

  const closeCol2 = () => {
    setArr2([]);
    setColumn2IsOpen(false);
  };
  const closeCol3 = () => {
    setArr3([]);
    setColumn3IsOpen(false);
  };
  const closeCol4 = () => {
    setArr4([]);
    setColumn4IsOpen(false);
  };
  const closeCol5 = () => {
    setArr5([]);
    setColumn5IsOpen(false);
  };

  // Events

  const handleMouseLeave = (e) => {
    closeAllColumns();
    setHoveredLvl1Name("");
  };

  // const handleMouseEnter = (e) => {
  //   setIsOutsideWrapper(false);
  // };

  // roca cota elementia da carielze dadgeba yvela marjvena coll daixuros
  const handleMouseMoveOnMenuPanel = (e) => {
    if (e.target.tagName === "UL") {
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position within the element.
      if (x > 20 && x < 170) {
        closeAllColumns();
      }
    }
  };

  // Coll 1 li action
  const handleLiMouseOverCol1 = (e, obj) => {
    if (e.target.classList.contains("catalogue-menu-li")) {
      if (obj.children) {
        setArr2([...obj.children]);
        setColumn2IsOpen(true);

        closeCol3();
        closeCol4();
        closeCol5();
      } else {
        closeCol2();
        closeCol3();
        closeCol4();
        closeCol5();
      }

      setHoveredLvl1Name(obj.name);

      setHoveredLvl2Name("");
      setHoveredLvl3Name("");
      setHoveredLvl4Name("");
      setHoveredLvl5Name("");
      e.stopPropagation();
    }
  };

  // console.log({hoverdLvl1Name,hoverdLvl2Name, hoverdLvl3Name, hoverdLvl4Name})

  // Coll 2 li action
  const handleLiMouseOverCol2 = (e, obj) => {
    if (e.target.classList.contains("catalogue-menu-li")) {
      if (obj.children) {
        setArr3([...obj.children]);
        setColumn3IsOpen(true);

        closeCol4();
        closeCol5();
      } else {
        closeCol3();
        closeCol4();
        closeCol5();
      }

      setHoveredLvl2Name(obj.name);

      setHoveredLvl3Name("");
      setHoveredLvl4Name("");
      setHoveredLvl5Name("");
    }
  };

  // Coll 3 li action
  const handleLiMouseOverCol3 = (e, obj) => {
    // console.log("hell", obj)
    if (e.target.classList.contains("catalogue-menu-li")) {
      if (obj.children) {
        setArr4([...obj.children]);
        setColumn4IsOpen(true);

        closeCol5();
      } else {
        closeCol4();
        closeCol5();
      }

      setHoveredLvl3Name(obj.name);

      setHoveredLvl4Name("");
      setHoveredLvl5Name("");
    }
  };

  // Coll 4 li action
  const handleLiMouseOverCol4 = (e, obj) => {
    // console.log("hell", obj)
    if (e.target.classList.contains("catalogue-menu-li")) {
      if (obj.children) {
        setArr5([...obj.children]);
        setColumn5IsOpen(true);
      } else {
        closeCol5();
      }
      setHoveredLvl4Name(obj.name);

      setHoveredLvl5Name("");
    }
  };

  const handleCatClick = (e, cat, level) => {
    // console.log(e, cat, level)
    if (cat.children) {
      return;
    }

    setSelectedLevelNames({
      level1: hoverdLvl1Name,
      level2: hoverdLvl2Name,
      level3: hoverdLvl3Name,
      level4: hoverdLvl4Name,
      level5: level === 5 ? cat.name : "",
    });
    closeAllColumns();
    setSelectedCatId(cat.categoryID);
    setSubCatId(cat.categoryID);
  };

  //   useEffect(() => {
  //     console.log(selectedLevelNames);
  //     console.log(selectedCatId);
  //   }, [selectedLevelNames]);

  const [columnSearchValues, setColumnSearchValues] = useState({
    level1: "",
    level2: "",
    level3: "",
    level4: "",
    level5: "",
  })


  return (
    <div className="App">
      <section className="catalogue-menu-main-container">
        <div className="catalogue-selected-categories">
          {(() => {
            const catNameArr = [];
            for (let [key, value] of Object.entries(selectedLevelNames)) {
              if (value !== "") {
                catNameArr.push(value);
              }
            }


            return catNameArr.map((catName, index) => {
              if (index === 0) {
                return (
                  <span className="catalogue-selected-categories__text-span catalogue-selected-categories__main-span">
                    {catName}
                  </span>
                );
              }
              return (
                <span className="catalogue-selected-categories__main-span">
                  <span style={{ padding: "0px 10px" }}>
                    <BsArrowRightShort />
                  </span>{" "}
                  <span className="catalogue-selected-categories__text-span">
                    {catName}
                  </span>
                </span>
              );
            });
          })()}
        </div>
        <section
          className="catalogue-menu-columns-container"
          onMouseLeave={handleMouseLeave}
          // onMouseEnter={handleMouseEnter}
        >
          {/* 111 */}
          {/* 111 */}
          <section className="catalogue-menu-column">
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                value={columnSearchValues.level1}
                onChange={(e) => setColumnSearchValues({...columnSearchValues, level1: e.target.value})}
              />
              <SearchSvg />
            </div>
            <ul
              className="arr1-ul catalogue-menu-column-list"
              onMouseMove={handleMouseMoveOnMenuPanel}
            >
              {/* <li>რაოდენობა: {arr1.length}</li> */}
              {arr1.filter(obj => obj.name.toLowerCase().includes(columnSearchValues.level1.toLowerCase())).map((obj) => {
                return (
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`${obj.name}`}
                    disabled={obj.name.length < 16 ? true : false}
                    delay={[500, 0]}
                    duration={0}
                    key={obj.id}
                  >
                    <li
                      // onClick={() => setArr2Ul(obj)}

                      onClick={(e) => {
                      
                        handleCatClick(e, obj, 1);
                      }}
                      key={obj.id}
                      className={`catalogue-menu-li ${
                        hoverdLvl1Name === obj.name ? "active" : ""
                      } ${
                        selectedLevelNames.level1 === obj.name ? "selected" : ""
                      }`}
                      data-has-sub-categories={obj.children ? true : false}
                      onMouseEnter={(e) => handleLiMouseOverCol1(e, obj)}
                    >
                      <span className="category-name" data-value={obj.name}>
                        {obj.name}
                      </span>
                      <span
                        className="category-arrow"
                        style={{ display: obj.children ? "flex" : "none" }}
                      >
                        <BsArrowRightShort />
                      </span>
                    </li>
                  </Tippy>
                );
              })}
            </ul>
          </section>

          {/* 222 */}
          {/* 222 */}
          <section
            className="catalogue-menu-column "
            style={{ display: column2IsOpen ? "flex" : "none" }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                // value={categorySearchValue}
                // onChange={(e) => setCategorySearchValue(e.target.value)}

                value={columnSearchValues.level2}
                onChange={(e) => setColumnSearchValues({...columnSearchValues, level2: e.target.value})}
              />
              <SearchSvg />
            </div>
            <ul className="arr2-ul  catalogue-menu-column-list">
              {/* <li>რაოდენობა: {arr2.length}</li> */}

              {arr2.filter(obj => obj.name.toLowerCase().includes(columnSearchValues.level2.toLowerCase())).map((obj) => {
                return (
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`${obj.name}`}
                    disabled={obj.name.length < 18 ? true : false}
                    delay={[500, 0]}
                    // duration={0}
                    key={obj.id}
                  >
                    <li
                      onClick={(e) => handleCatClick(e, obj, 2)}
                      // onClick={() => setArr3Ul(obj)}
                      key={obj.id}
                      className={`catalogue-menu-li ${
                        hoverdLvl2Name === obj.name ? "active" : ""
                      }  ${
                        selectedLevelNames.level2 === obj.name ? "selected" : ""
                      }`}
                      onMouseEnter={(e) => handleLiMouseOverCol2(e, obj)}
                    >
                      <span className="category-name" data-value={obj.name}>
                        {obj.name}
                      </span>
                      <span
                        className="category-arrow"
                        style={{ display: obj.children ? "flex" : "none" }}
                      >
                        <BsArrowRightShort />
                      </span>
                    </li>
                  </Tippy>
                );
              })}
            </ul>
          </section>

          {/* 33 */}
          {/* 33 */}
          <section
            className="catalogue-menu-column "
            style={{ display: column3IsOpen ? "flex" : "none" }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                // value={categorySearchValue}
                // onChange={(e) => setCategorySearchValue(e.target.value)}

                value={columnSearchValues.level3}
                onChange={(e) => setColumnSearchValues({...columnSearchValues, level3: e.target.value})}
              />
              <SearchSvg />
            </div>
            <ul className="arr3-ul catalogue-menu-column-list">
              {/* <li>რაოდენობა: {arr3.length}</li> */}

              {arr3.filter(obj => obj.name.toLowerCase().includes(columnSearchValues.level3.toLowerCase())).map((obj) => {
                return (
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`${obj.name}`}
                    disabled={obj.name.length < 16 ? true : false}
                    delay={[500, 0]}
                    duration={0}
                    key={obj.id}
                  >
                    <li
                      onClick={(e) => handleCatClick(e, obj, 3)}
                      // onClick={() => setArr4Ul(obj)}
                      key={obj.id}
                      onMouseEnter={(e) => handleLiMouseOverCol3(e, obj)}
                      className={`catalogue-menu-li ${
                        hoverdLvl3Name === obj.name ? "active" : ""
                      } ${
                        selectedLevelNames.level3 === obj.name ? "selected" : ""
                      }`}
                    >
                      <span className="category-name" data-value={obj.name}>
                        {obj.name}
                      </span>
                      <span
                        className="category-arrow"
                        style={{ display: obj.children ? "flex" : "none" }}
                      >
                        <BsArrowRightShort />
                      </span>
                    </li>
                  </Tippy>
                );
              })}
            </ul>
          </section>

          {/* 44 */}
          {/* 44 */}
          <section
            className="catalogue-menu-column "
            style={{ display: column4IsOpen ? "flex" : "none" }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                // value={categorySearchValue}
                // onChange={(e) => setCategorySearchValue(e.target.value)}

                value={columnSearchValues.level4}
                onChange={(e) => setColumnSearchValues({...columnSearchValues, level4: e.target.value})}
              />
              <SearchSvg />
            </div>
            <ul className="arr4-ul catalogue-menu-column-list">
              {/* <li>რაოდენობა: {arr4.length}</li> */}
              {arr4.filter(obj => obj.name.toLowerCase().includes(columnSearchValues.level4.toLowerCase())).map((obj) => {
                return (
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`${obj.name}`}
                    disabled={obj.name.length < 16 ? true : false}
                    delay={[500, 0]}
                    duration={0}
                    key={obj.id}
                  >
                    <li
                      onClick={(e) => handleCatClick(e, obj, 4)}
                      className={`catalogue-menu-li ${
                        hoverdLvl4Name === obj.name ? "active" : ""
                      } ${
                        selectedLevelNames.level4 === obj.name ? "selected" : ""
                      }`}
                      key={obj.id}
                      onMouseEnter={(e) => handleLiMouseOverCol4(e, obj)}
                    >
                      <span className="category-name" data-value={obj.name}>
                        {obj.name}
                      </span>
                      <span
                        className="category-arrow"
                        style={{ display: obj.children ? "flex" : "none" }}
                      >
                        <BsArrowRightShort />
                      </span>
                    </li>
                  </Tippy>
                );
              })}
            </ul>
          </section>
          {/* 55 */}
          {/* 55 */}
          <section
            className="catalogue-menu-column "
            style={{ display: column5IsOpen ? "flex" : "none" }}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                // value={categorySearchValue}
                // onChange={(e) => setCategorySearchValue(e.target.value)}

                value={columnSearchValues.level5}
                onChange={(e) => setColumnSearchValues({...columnSearchValues, level5: e.target.value})}
              />
              <SearchSvg />
            </div>
            <ul className="arr5-ul catalogue-menu-column-list">
              {/* <li>რაოდენობა: {arr5.length}</li> */}
              {arr5.filter(obj => obj.name.toLowerCase().includes(columnSearchValues.level5.toLowerCase())).map((obj) => {
                return (
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`${obj.name}`}
                    disabled={obj.name.length < 16 ? true : false}
                    delay={[500, 0]}
                    duration={0}
                    key={obj.id}
                  >
                    <li
                      onClick={(e) => handleCatClick(e, obj, 5)}
                      key={obj.id}
                      className={`catalogue-menu-li  ${
                        selectedLevelNames.level5 === obj.name ? "selected" : ""
                      }`}
                    >
                      <span className="category-name" data-value={obj.name}>
                        {obj.name}
                      </span>
                      <span
                        className="category-arrow"
                        style={{ display: obj.children ? "flex" : "none" }}
                      >
                        <BsArrowRightShort />
                      </span>
                    </li>
                  </Tippy>
                );
              })}
            </ul>
          </section>

          {/*End of Column Container */}
        </section>
      </section>
    </div>
  );
}

export default NewCatMenu;