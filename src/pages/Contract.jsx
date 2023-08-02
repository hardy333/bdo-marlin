import React, { useRef } from "react";
import contractData from "./contract/contractData";

import "../styles/contract.css"

const isHeading = (lineStr) => {
  return /^[0-9]+. /.test(lineStr);
};

const Contract = () => {

  const lines = contractData.split("\n");
  const activeItemRef = useRef(null)

  const handleClick = (e) => {
    
    
    if(activeItemRef.current){
      activeItemRef.current.classList.remove("active")
    }

    e.currentTarget.classList.add("active")
    activeItemRef.current = e.currentTarget

  }

  return (
    <>
      <section className="contract">
        <h1>კონტრაქტის გვერდი </h1>
        <main className="contract-main">
          <div className="contract-headings">
            <ul className="contract-headings__list">
            {lines.map((line, index) => isHeading(line) ? <li onClick={handleClick}  key={index} className={`contract-headings__list-item `}>
              
            <a href={`#${line}`}>{line}</a>
              </li> : null)}
            </ul>
          </div>
          <div className="contract-text">
            {lines.map((line, index) => {
              if (isHeading(line)) {
                return (
                  <h2
                  key={index}
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginTop: "30px",
                      marginBottom: "10px"
                    }}
                    id={line}
                    className="contract-text__heading"
                  >
                    {line}
                  </h2>
                );
              } else {
                return <p key={index} className="contract-text__paragraph">{line}</p>;
              }
            })}
          </div>
        </main>
      </section>
    </>
  );
};

export default Contract;

{
  /* <Suspense fallback={<h2>Loading ...</h2>}>
{contractData}
</Suspense> */
}
