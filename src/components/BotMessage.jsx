import React, { useState, useEffect, useCallback } from "react";

import expandIcon from "../images/expand.svg";
import ImageViewer from "react-simple-image-viewer";

export default function BotMessage({ fetchMessage, onAddtoCart = () => {} }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [menu, setMenu] = useState();
  const [menuThumbnail, setMenuThumbnail] = useState();

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      if (msg && (msg.label === "IMAGE_LIST" || msg.label === "IMAGE_URL")) {
        const arr = [];
        const menuThumbnail = [];
        if (msg.label === "IMAGE_LIST") {
          // eslint-disable-next-line array-callback-return
          msg.value.map((value) => {
            if (value && value.structValue) {
              arr.push(value.structValue.fields.image_url.stringValue);
              menuThumbnail.push(
                value.structValue.fields.thumbnail_url.stringValue
              );
            }
          });
        } else {
          // eslint-disable-next-line array-callback-return
          [msg.value].map((value) => {
            arr.push(value);
            menuThumbnail.push(value);
          });
        }
        setMessage(msg);
        setMenu(arr);
        setMenuThumbnail(menuThumbnail);
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
              {menuThumbnail && menuThumbnail.length
                ? menuThumbnail.map((src, index) => (
                    <span className="menu-option" key={index}>
                      <img
                        className="menu-img"
                        src={src}
                        onClick={() => openImageViewer(index)}
                        alt="Menu"
                        height="200"
                        width="180"
                      />
                    </span>
                  ))
                : null}
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
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
