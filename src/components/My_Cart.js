//TAHJ
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";
import "../components/MyCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNunchaku } from "react-icons/gi";
import { Products } from ".";

const My_Cart = ({
  shown,
  flavors,
  removeFromCart,
  updateQuantity,
  onClose,
}) => {
  return (
    <div className="modal" style={{ display: shown ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className="header">
          <h2> Cart </h2>
          <button className="btn-close" onClick={onClose}>
            <AiFillCloseCircle size={30}></AiFillCloseCircle>
          </button>
        </div>
        <div className="cart-items">
          {flavors.length === 0 && (
            <span className="empty-text">Your Cart Is Empty</span>
          )}
          {flavors.map((flavor) => (
            <div className="cart-item" key={flavor.id}>
              <img src={flavor.image_url} alt={flavor.name}></img>
              <div className="flavor-info">
                <h3>{flavor.name}</h3>
                <span className="flavor-price">
                  {flavor.price * flavor.count}
                </span>
                <select
                  className="count"
                  value={flavor.count}
                  onChange={(e) => {
                    updateQuantity(flavor.id, e.target.value);
                  }}
                >
                  {[...Array(10).keys()].map((number) => {
                    const num = number + 1;
                    return (
                      <option value={num} key={num}>
                        {num}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn remove-cart"
                  onClick={() => removeFromCart(flavor)}
                >
                  <RiDeleteBin6Line size={20}></RiDeleteBin6Line>
                </button>
              </div>
            </div>
          ))}
          {flavors.length > 0 && (
            <buttton className="checkout-btn">Proceed to Checkout</buttton>
          )}
        </div>
      </div>
    </div>
  );
};

export default My_Cart;
