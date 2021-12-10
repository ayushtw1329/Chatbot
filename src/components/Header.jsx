import React from "react";
import cartIcon from "../images/cart-icon.svg";

export default function Header({ count }) {
  return (
    <header className="header">
      <h1 className="logo">Pizzazza</h1>
      <div className="header-right">
        {/* <div className="address">Order for address : Location 2</div> */}
        <div className="cart">
          <img src={cartIcon} alt="Cart" />
          {count ? <span className="count">{count}</span> : null}
        </div>
      </div>
    </header>
  );
}
