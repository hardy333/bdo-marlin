import React, { useState } from "react";
import termsData  from "./terms/termsData";
import "../styles/terms.css";



const Terms = () => {
  const [terms, setTerms] = useState(termsData)
  const [selectedTerm, setSelectedTerm] = useState(() => terms[0])

  
  return (
    <>
      <section className="terms">
        <h1>წესები და პირობები</h1>
        <main className="terms__main">
          <div className="terms__left">
            <ul className="terms__list">
              {
                termsData.map((term, index) => {
                  return <li onClick={() => setSelectedTerm(term)} className={`terms__list-item ${selectedTerm.q === term.q ? "active" : ""}`} key={term.q}>
                    <span className="terms__list-item__number">{index + 1}</span>
                    <span className="terms__list-item__q">{term.q}</span>
                  </li>
                })
              }
            </ul>
          </div>
          <div className="terms__right">
              {selectedTerm.a.split("\n").map(pText=> <p>{pText}</p>) }
            
          </div>
        </main>
      </section>
    </>
  );
};

export default Terms;
