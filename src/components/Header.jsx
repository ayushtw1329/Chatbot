import React from "react";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Pizzazza</h1>
      <div className="header-right">
        <div className="address">Order for address : Location 2</div>
        <div className="cart">
          <img src="../../../images/cart-icon.svg" alt="Cart" />
          <span className="count">3</span>
        </div>
      </div>
    </header>
  );
}
