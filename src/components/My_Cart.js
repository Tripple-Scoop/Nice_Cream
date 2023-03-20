import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/MyCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchActiveCart, updateCartItemQuantity } from "../api/order_items";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNunchaku } from "react-icons/gi";

const My_Cart = ({ shown, onClose, user }) => {
  const [cart, setCart] = useState([]);
  const { username } = user;

  // console.log("1stUserLog see if getting", username);
  useEffect(() => {
    const getActiveCart = async () => {
      const cartData = await fetchActiveCart(username);
      setCart(cartData);
      // console.log("2nd log", username);
    };
    getActiveCart();
    // console.log("MY CART NAME", username);
  }, []);
  console.log("TAHJ CART", cart);

 

  const incrementQuantity = (id) => {
    const items = cart.items.find((items) => items.id === id);

    updateCartItemQuantity(id, items.quantity + 1);

    console.log("updateClick", id, items.quantity);
  };

  const decrementQuantity = (id) => {
    const item = cart.items.find((item) => item.id === id);
    if (item.quantity > 1) {
      updateCartItem(id, item.quantity - 1);
    }
  };
  return (
    <div className="modal" style={{ display: shown ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className="header">
          <h2>Cart</h2>
          <button className="btn-close" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-items">
          {cart?.items?.length === 0 && (
            <span className="empty-text">Your Cart Is Empty</span>
          )}

          {cart?.items?.map((flavor, i) => {
            return (
              <div className="cart-item" key={i}>
                <img
                  src={flavor.flavor_info.image_url}
                  alt={flavor.flavor_info.name}
                />

                <div className="flavor-info">
                  <h3>{flavor.flavor_info.name}</h3>
                  <span className="flavor-price">
                    Subtotal: ${flavor.flavor_info.price * flavor.quantity}.00
                  </span>
                  <button
                    className="btn increment-quantity"
                    onClick={() => incrementQuantity(flavor.id)}
                  >
                    <GiNunchaku size={20} />
                  </button>

                  <button
                    className="btn remove-cart"
                    onClick={() => removeCartItem(flavor.flavor_info.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
            );
          })}
          {cart?.items?.length > 0 && (
            <button className="checkout-btn">Proceed to Checkout</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default My_Cart;
