import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchFlavorById } from "../api/flavors";


const SingleProduct = ({ user}) => {
  const [singleFlavor, setSingleFlavor] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchedFlavorById = async () => {
      try {
        const result = await fetchFlavorById(id);
        setSingleFlavor(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedFlavorById();
  }, [id]);

  if (!singleFlavor) {
    return <div>Loading...</div>;
  }

  return (
    <div id="products-container">
      <div className="flavorTitle">
        <h1>Checking out this Flavor?</h1>
      </div>
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();
        }}
      >
        <div id="flavor_body">
          <div className="flavor_info">
            <div className="flavor_name">
              <h2>{singleFlavor.name}</h2>
            </div>
            <div className="flavor_type">{singleFlavor.type}</div>
            <div>
              <img
                className="flavor_image"
                onClick={() => navigate(`/flavors/${singleFlavor.id}`)}
                src={singleFlavor.image_url}
              />
            </div>
            <div className="flavor_description">
              <p>Description:{singleFlavor.description}</p>
            </div>
            <div className="flavor_price">
              Price: ${singleFlavor.price}
            </div>
            <div id="product_options">
              <button
                className="create-button"
                onClick={() => addFlavorToCart(singleFlavor)}
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
        </div>
      </form>
    </div>
  );
};

export default SingleProduct;



