import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllFlavors } from "../api/flavors";


const Products = () => {
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
    <div className="products-container">
      <div className="flavorTitle">
        <h1>Our Flavors</h1>
      </div>
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();
        }}
      >
        <div className="flavorBody">
          {flavors.map((flavor) => {
            return (
              <div className="flavor_info">
                <div className="flavor_name">{flavor.name}</div>
                <div className="flavor_type">{flavor.type}</div>
                <div> <img className="flavor_image" src={flavor.image_url} /></div>
                <div className="flavor_Description"> Description:{flavor.description}</div>
                <div className="flavor_Price"> Price: ${flavor.price}</div>
                <button className="createButton" onClick={() => addFlavorToCart(flavor)}>Add to Cart!</button>
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
