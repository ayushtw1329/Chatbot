import React, { useState, useEffect } from "react";

import menu from "../images/menu.svg";
import expandIcon from "../images/expand.svg";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message bot-message">
      {message.isMenu ? (
        <div className="menu-wrapper">
          <div className="menu-options">
            <span className="menu-option">
              <img src={menu} alt="Menu" />
            </span>
            <span className="menu-option">
              <img src={menu} alt="Menu" />
            </span>
            <span className="menu-option">
              <img src={menu} alt="Menu" />
            </span>
            <span className="menu-option">
              <img src={menu} alt="Menu" />
            </span>
          </div>
          <button className="expandBtn">
            <img src={expandIcon} alt="Expand Icon" />
          </button>
        </div>
      ) : (
        <> {isLoading ? "..." : message}</>
      )}
    </div>
  );
}

/* <div className="message bot-message">
Here is a list of 3 Dominos near to your location
<ul className="locations">
  <li className="location">
    <a href="#">Dominos address location 1 address Line 1</a>
  </li>
  <li className="location">
    <a href="#">Dominos address location 2 address Line 2</a>
  </li>
  <li className="location">
    <a href="#">Dominos address location 3 address Line 3</a>
  </li>
</ul>
</div>
<div className="message bot-message">
<ul className="options">
  <li className="option">
    <div className="item">
      <span>Choco Lava Cake</span>
      <span className="text">
        Lorem ipsum Lorem ipsum Lorem ipsum{" "}
      </span>
    </div>
    <button className="btn addtBtn">Add</button>
  </li>
  <li className="option">
    <div className="item">
      <span>Choco Lava Cake</span>
      <span className="text">
        Lorem ipsum Lorem ipsum Lorem ipsum{" "}
      </span>
    </div>
    <button className="btn addtBtn">Add</button>
  </li>
  <li className="option">
    <div className="item">
      <span>Choco Lava Cake</span>
      <span className="text">
        Lorem ipsum Lorem ipsum Lorem ipsum{" "}
      </span>
    </div>
    <button className="btn addtBtn">Add</button>
  </li>
</ul>
</div> */
