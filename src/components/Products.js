import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllFlavors } from "../api/flavors";
import { addToCart } from "../api/order_items";

const Products = ({ setCartFlavors, cartFlavors, user }) => {
  const [flavors, setFlavors] = useState([]);
  const navigate = useNavigate();

  // const addFlavorToCart = (flavor) => {
  //   const newFlavor = {
  //     ...flavor,
  //     count: 1,
  //   };
  //   setCartFlavors([...cartFlavors, newFlavor]);
  // };

  useEffect(() => {
    const fetchedAllFlavors = () => {
      fetchAllFlavors()
        .then((result) => {
          setFlavors(result);
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchedAllFlavors();
  }, []);

  return (
    <div id="products-container">
      <div className="flavorTitle">
        <h1>Our Flavors</h1>
      </div>
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();
        }}
      >
        <div id="flavor_body">
          {flavors.map((flavor) => {
            return (
              <div className="flavor_info">
                <div className="flavor_name">
                  <h2>{flavor.name}</h2>
                </div>
                <div className="flavor_type">{flavor.type}</div>
                <div>
                  {" "}
                  <img className="flavor_image" src={flavor.image_url} />
                </div>
                <div className="flavor_description">
                  {" "}
                  <p>Description:{flavor.description}</p>
                </div>
                <div className="flavor_price"> Price: ${flavor.price}</div>
                <div id="product_options">
                  <button
                    className="create-button"
                    onClick={() =>
                      addToCart({
                        flavor_id: flavor.id,
                        quantity: 1,
                        customer_id: user.id,
                      })
                    }
                  >
                    Add to Cart!
                  </button>
                  {user.admin === true ? (
                    <div>You are an admin</div>
                  ) : (
                    <div>You are not an admin</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div id="loginPopUpDiv"></div>
      </form>
    </div>
  );
};

export default Products;
