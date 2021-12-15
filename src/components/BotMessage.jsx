import React, { useState, useEffect, useCallback } from "react";

import expandIcon from "../images/expand.svg";
import ImageViewer from "react-simple-image-viewer";

export default function BotMessage({ fetchMessage, onAddtoCart = () => {} }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [menu, setMenu] = useState();

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      if (msg && (msg.label === "IMAGE_LIST" || msg.label === "IMAGE_URL")) {
        const arr = [];
        if (msg.label === "IMAGE_LIST") {
          msg.value.map((value) => arr.push(value.stringValue));
        } else {
          [msg.value].map((value) => arr.push(value));
        }
        setMessage(msg);
        setMenu(arr);
      } else {
        setMessage(msg);
      }
    }
    loadMessage();
  }, [fetchMessage]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="message bot-message">
      <>
        {isLoading ? (
          <div className="dot-elastic"></div>
        ) : message &&
          (message.label === "IMAGE_LIST" || message.label === "IMAGE_URL") ? (
          <div className="menu-wrapper">
            <div className="menu-options">
              {menu &&
                menu.length &&
                menu.map((src, index) => (
                  <span className="menu-option" key={index}>
                    <img
                      src={src}
                      onClick={() => openImageViewer(index)}
                      alt="Menu"
                      height="200"
                      width="160"
                    />
                  </span>
                ))}
              {isViewerOpen && (
                <ImageViewer
                  src={menu}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  disableScroll={false}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                  }}
                  closeOnClickOutside={true}
                />
              )}
            </div>
            <button className="expandBtn" onClick={() => openImageViewer(0)}>
              <img src={expandIcon} alt="Expand Icon" />
            </button>
          </div>
        ) : message && message.label === "OBJECT_LIST" ? (
          <ul className="options">
            {message.value.map((value, index) => (
              <li className="option" key={index}>
                <div className="item">
                  <span>{value.structValue.fields.name.stringValue}</span>
                </div>
                <span>{value.structValue.fields.price.stringValue}</span>
                <button className="btn addtBtn" onClick={() => onAddtoCart()}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : message && message.label === "STRING_LIST" ? (
          <ul className="locations">
            {message.value.map((value, index) => (
              <li className="location" key={index}>
                <a href="#">{value.stringValue}</a>
              </li>
            ))}
          </ul>
        ) : (
          message && message.value
        )}
      </>
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
*/
