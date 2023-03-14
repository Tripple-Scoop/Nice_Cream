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
              <div className="flavor_name" key={flavor.name}>
                <h2 className="flavor_type">Type: {flavor.type}</h2>
                <h2 className="flavor_image">Title: {flavor.image_url}</h2>
                <h3 className="flavor_Description"> Description: {flavor.description}</h3>
                <h3 className="flavor_Price"> Price: ${flavor.price}</h3>
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
