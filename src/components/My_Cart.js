import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../components/MyCart.css";
import { removeCartItem, updateCartItemQuantity } from "../api/order_items";

// export const changeQuantity = (flavor_id, count) => {
//   setCartFlavors((oldState) => {
//     const flavorIndex = oldState.findIndex((item) => item.id === flavor_id);
//     if (flavorIndex !== -1) {
//       oldState[flavorIndex].count = count;
//     }
//     return [...oldState];
//   });
// };



const MyCart = ({ shown, flavors, onClose, flavor_id, count }) => {
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
          {flavors.length === 0 && (
            <span className="empty-text">Your Cart Is Empty</span>
          )}
          {flavors.map((flavor) => (
            <div className="cart-item" key={flavor.id}>
              <img src={flavor.image_url} alt={flavor.name} />
              <div className="flavor-info">
                <h3>{flavor.name}</h3>
                <span className="flavor-price">
                  {flavor.price * flavor.count}
                </span>
                <select
                  className="count"
                  value={flavor.count}
                  onChange={(e) => {
                    changeQuantity(flavor_id, count);
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
                  onClick={() => removeCartItem(flavor.id)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
          {flavors.length > 0 && (
            <button className="checkout-btn">Proceed to Checkout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
