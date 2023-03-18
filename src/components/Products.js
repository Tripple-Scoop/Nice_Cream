import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllFlavors } from "../api/flavors";


const Products = ({ user }) => {
  const [flavors, setFlavors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedAllFlavors = () => {
      fetchAllFlavors()
        .then((result) => {
          setFlavors(result)
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchedAllFlavors()
  }, []);

  return (
    <div id="products-container">
      <div className="flavorTitle">
        <h1>Our Flavors</h1>
      </div>
      {user.admin === true ? (
        <button onClick={() => navigate(`/CreateNewFlavor`)}>Create New Flavor</button>
      ) : (
        ""
      )}
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();
        }}
      >
        <div id="flavor_body">
          {flavors.map((flavor) => {
            return (
              <div className="flavor_info" key={flavor.id}>
                <div className="flavor_name"><h2>{flavor.name}</h2></div>
                <div className="flavor_type">{flavor.type}</div>
                <div>
                  <img
                    className="flavor_image"
                    onClick={() => navigate(`/Product/${flavor.id}`)}
                    src={flavor.image_url}
                  />
                </div>
                <div className="flavor_description">
                  <p>Description:{flavor.description}</p>
                </div>
                <div className="flavor_price">Price: ${flavor.price}</div>
                <div id="product_options">
                  <button
                    className="create-button"
                    onClick={() => addFlavorToCart(flavor)}
                  >
                    Add to Cart!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};


export default Products;
