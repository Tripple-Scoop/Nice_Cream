import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserReviews, fetchUserOrderHistory, fetchUser, fetchAllUsers } from "../api/users";



//NATOSHIA

const Profile = ({ user }) => {
  const [reviews, setReviews] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const { username } = user;
  // console.log('reviews: ', reviews);
  // console.log('orderHistory: ', orderHistory);
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserReviews(username).then((result) => {
      setReviews(result);
      console.log(result);
    })
      .catch((error) => {
        console.log(error)
      })

    fetchUserOrderHistory(username).then((result) => {
      setOrderHistory(result);
      console.log('order history: ', result);
    })
      .catch((error) => {
        console.log(error)
      })

    fetchAllUsers().then((result) => {
      setUsers(result);
      console.log('all users: ', result);
    })
      .catch((error) => {
        console.log(error)
      })

  }, []);

  return (
    <div>

      {user.name !== null ? <h1 id="profile_welcome">Welcome back, {user.name}!</h1> :
        <h1>You must be logged in to access your profile page.</h1>
      }

      <div className="profile-section" id="account-info">
        <h2>MY ACCOUNT INFORMATION:</h2>
        <div>Customer ID: {user.id}</div>
        <div>Name: {user.name}</div>
        <div>Username: {user.username}</div>
        <div>Address: {user.address}</div>
        <div>Administrator Permissions: {user.admin === true ? "Yes" : "No"}</div>
      </div>
      {(user.admin === true)
        ? <div className="profile-section" id="admin-customer-info"><h2>ACTIVE CUSTOMERS:</h2>
          <div className="users-info">
            {users.map((user, i) => {
              return(
                <div key={i} className="single-user-info">
                  <div>Name: {user.name}</div>
                  <div>Username: {user.username}</div>
                  <div>Address: {user.address}</div>
                  <div>Administrator?:{ user.admin === true ? " YES" : " NO"}</div>
                </div>
              )
            })}


          </div>
        </div>


        : null}

      <div className="profile-section" id="user_reviews">
        <div><h2>MY REVIEWS: <Link className="link" to="/Products">Have an about a product? Take a look and Post a Review!</Link></h2></div>
        <div id="reviews_container">
          <div>
            {reviews?.reviews?.map((review, i) => {

              return (
                <div key={i} className="profile-review">
                  <div><h2>{review.title}</h2></div>
                  <div><h2>{review.title}</h2></div>
                  <div><h2>{review.title}</h2></div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <div className="profile-section" id="order_history">
        <h2>MY ORDER HISTORY:  <Link className="link" to="/Products">Start Shopping Now!</Link></h2>
        <div id="history_container">

          {orderHistory?.map((order, i) => {
            return (
              <div key={i} className="prev-order">
                <div><h3>{Date(order.date)}</h3></div>
                <div><h3>Shipped to: {order.shipping_address}</h3></div>
                <div><h2>Items:</h2> {order.items.map((item, i) => {
                  return (
                    <div className="item-info" key={i}>
                      <div><h4>{item.flavor_info.name} </h4></div>
                      <div>Price: ${item.flavor_info.price}.00</div>
                      <div> Quantity: {item.quantity}</div>
                      <div>  <img
                        className="item_image"
                        src={item.flavor_info.image_url}
                      /></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )
                })}</div>



              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
};


export default Profile;