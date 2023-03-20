import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/MyCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchActiveCart, updateCartItemQuantity } from "../api/order_items";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNunchaku } from "react-icons/gi";

const My_Cart = ({ shown, onClose, user }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getActiveCart = async () => {
      const cartData = await fetchActiveCart(user.username);
      setCart(cartData);
    };
    getActiveCart();
  }, [user.username]);

  const incrementQuantity = async (id) => {
    const item = cart.items.find((item) => item.id === id);
    const newQuantity = item.quantity + 1;
    await updateCartItemQuantity(id, newQuantity);
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });
      return { ...prevCart, items: updatedItems };
    });
  };

  const decrementQuantity = async (id) => {
    const item = cart.items.find((item) => item.id === id);
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      await updateCartItemQuantity(id, newQuantity);
      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
        return { ...prevCart, items: updatedItems };
      });
    }
  };

  const removeCartItem = async (id) => {
    await deleteCartItem(id);
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      return { ...prevCart, items: updatedItems };
    });
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
                    className="btn increment-quantity"
                    onClick={() => decrementQuantity(flavor.id)}
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
