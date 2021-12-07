import React from "react";
import cartIcon from "../images/cart-icon.svg";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Pizzazza</h1>
      <div className="header-right">
        <div className="address">Order for address : Location 2</div>
        <div className="cart">
          <img src={cartIcon} alt="Cart" />
          <span className="count">3</span>
        </div>
      </div>
    </header>
  );
}
