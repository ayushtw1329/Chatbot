import React, { useEffect, useRef } from "react";
import botIcon from "../images/bot-icon.svg";
import menu from "../images/menu.svg";
import userIcon from "../images/user-icon.svg";
import expandIcon from "../images/expand.svg";

export default function Messages({ messages }) {
  // const el = useRef(null);
  // useEffect(() => {
  //   el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  // });
  return (
    <div className="chatArea">
      <span className="bot-icon">
        <img src={botIcon} alt="Chat Bot Icon" />
      </span>
      <div className="chatMessages">
        <div className="message user-message">
          Can you tell me the closest Domino's near my location?
        </div>
        <div className="message bot-message">
          Here is a list of 3 Dominos near to your location
          <ul className="locations">
            <li className="location">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Dominos address location 1 address Line 1</a>
            </li>
            <li className="location">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Dominos address location 2 address Line 2</a>
            </li>
            <li className="location">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Dominos address location 3 address Line 3</a>
            </li>
          </ul>
        </div>
        <div className="message user-message">Dominos address location 2</div>
        <div className="message bot-message">Super! Location selected</div>
        <div className="message user-message">Is there a Thursday special?</div>
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
        </div>
        <div className="message user-message">Is there a Thursday special?</div>
        <div className="message bot-message">
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
        </div>
        <div className="message user-message">Is there a Thursday special?</div>
        <div className="message bot-message">Super! Location selected</div>
        <div className="message user-message">Is there a Thursday special?</div>
        <div className="message bot-message">Super! Location selected</div>
        <div className="message user-message">Is there a Thursday special?</div>
        <div className="message bot-message">Super! Location selected</div>
        <div className="message user-message">Is there a Thursday special?</div>
      </div>
      <span className="user-icon">
        <img src={userIcon} alt="User Icon" />
      </span>
      {/* <div className="messages">
        {messages}
        <div id={"el"} ref={el} />
      </div> */}
    </div>
  );
}
