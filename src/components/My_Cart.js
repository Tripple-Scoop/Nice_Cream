import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";
import "../components/MyCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchActiveCart } from "../api/order_items";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiNunchaku } from "react-icons/gi";
import { Products } from ".";

//   return (
//     <div>
//       <h1>My Cart</h1>
//       {cart.map((item) => (
//         <div key={item.id}>
//           <p>{item.flavor_name}</p>
//           <p>Quantity: {item.quantity}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

const My_Cart = ({
  shown,
  onClose,

  flavor_id,
  user,
  count,
}) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getActiveCart = async () => {
      const cartData = await fetchActiveCart(user.id);
      setCart(cartData);
      console.log("This IS CART DATA", cartData);
    };
    getActiveCart();
    console.log("MY CART CUS ID", user.id);
  }, [user.id]);
  const flavors = cart;
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
                    updateCartItemQuantity(flavor_id, count);
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
export default My_Cart;
