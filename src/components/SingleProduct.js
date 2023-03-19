import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDeleteFlavor, fetchFlavorById } from "../api/flavors";
import { fetchReviewsByFlavorId } from "../api/reviews";


const SingleProduct = ({ user }) => {
  const [singleFlavor, setSingleFlavor] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchedFlavorById = async () => {
      try {
        const result = await fetchFlavorById(id);
        setSingleFlavor(result);
        console.log("single flavor", result);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchedReviewsByFlavorId = async () => {
      try {
        const result = await fetchReviewsByFlavorId(id);
        setReviews(result);
        console.log("reviews", result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchedReviewsByFlavorId();
    fetchedFlavorById();
  }, [id]);

  if (!singleFlavor) {
    return <div>Loading...</div>;
  }
  if (!reviews) {
    return <div>No reviews yet</div>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this flavor?");
    console.log("delete confirm", confirmed)
    if (confirmed) {
      try {
        const deletedFlavor = await fetchDeleteFlavor(singleFlavor.id);
        console.log("deleted flavor", deletedFlavor);
        navigate("/Products");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                className="addToCart-button"
                onClick={() => addToCart(singleFlavor)}
              >
                Add to Cart!
              </button>
              <div>
                {user.admin === true ?
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/EditProduct/${singleFlavor.id}`)}> Edit </button> : ""
                }<div>
                  {user.admin === true ?
                    <button className="delete-button" onClick={handleDelete}>
                      Delete
                    </button> : ''
                  }</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="flavor_body">
            {reviews.map((review) => {
              return (
                <div className="review_info" key={review.id}>
                  <div className="review_user"><h2>{review.username}</h2></div>
                  <div className="review_title">{review.title}</div>
                  <div className="review_content">
                    <p>Review:{review.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleProduct;



