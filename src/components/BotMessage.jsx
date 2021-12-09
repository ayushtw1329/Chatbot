import React, { useState, useEffect, useCallback } from "react";

import menu from "../images/menu.svg";
import expandIcon from "../images/expand.svg";
import ImageViewer from "react-simple-image-viewer";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const images = [menu, menu, menu, menu];

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      if (msg) {
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
      {message.isMenu ? (
        <div className="menu-wrapper">
          <div className="menu-options">
            {images.map((src, index) => (
              <span className="menu-option" key={index}>
                <img
                  src={src}
                  onClick={() => openImageViewer(index)}
                  alt="Menu"
                />
              </span>
            ))}
            {isViewerOpen && (
              <ImageViewer
                src={images}
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
      ) : (
        <> {isLoading ? <div className="dot-elastic"></div> : message} </>
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
