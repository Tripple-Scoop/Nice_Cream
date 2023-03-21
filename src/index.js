import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { GiShoppingBag } from "react-icons/gi";
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  Checkout,
  Register,
  My_Cart,
  Profile,
  Products,
  SingleProduct,
  EditProduct,
  CreateNewFlavor,
} from "./components";
import { fetchUser } from "./api/users";
import logo from "./assets/images/Full_Logo_Transparent.png";

const App = () => {
  //Cart State TAHJ
  const [cartShown, setCartShown] = useState(false);

  //Login State
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      setToken(localStorage.getItem("myToken"));
      fetchUser().then((result) => {
        setUser(result);
      });
    }
    console.log(user);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [token]);

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("myToken");
  };
  return (
    <div>
      <header>
        <nav className="nav">
          <div id="header_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav_links">
            <Link className="link" id="home_link" to="/">
              Home
            </Link>
            <Link className="link" id="products_link" to="/Products">

              Products
            </Link>
            {token === "" ? null : (
              <Link className="link" id="profile_link" to="/Profile">

                My Profile
              </Link>
            )}

            <Link
              className="btn"
              to="/My_Cart"
              onClick={() => setCartShown(true)}
            >
              <GiShoppingBag size={24} />
            </Link>

            {token === "" ? (
              <Link to={"/Login"}>
                <img
                  id="header-button"
                  src="https://cdn-icons-png.flaticon.com/512/9403/9403338.png"
                ></img>
              </Link>
            ) : (
              <Link
                id="logout"
                onClick={(event) => {
                  event.preventDefault();
                  removeToken();
                  navigate("/Login");
                }}
              >
                <img
                  id="header-button"
                  src="https://cdn-icons-png.flaticon.com/512/9403/9403330.png"
                ></img>
              </Link>
            )}
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Home user={user} token={token} />} />
            <Route
              path="/Login"
              element={
                <Login setToken={setToken} token={token} setUser={setUser} />
              }
            />
            <Route
              path="/Register"
              element={
                <Register
                  setToken={setToken}
                  user={user}
                  token={token}
                  setUser={setUser}
                />
              }
            />
            { }
            <Route
              path="/Profile"
              element={
                user?.name ? (
                  <Profile user={user} token={token} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/My_Cart"
              element={
                <My_Cart
                  // setCartFlavors={setCartFlavors}
                  onClose={() => setCartShown(false)}
                  user={user}
                  shown={cartShown}
                  token={token}
                />
              }
            />
            <Route
              path="/CreateNewFlavor"
              element={<CreateNewFlavor user={user} token={token} />}
            />
            <Route
              path="/Products"
              element={<Products user={user} token={token} />}
            />
            <Route
              path="/Product/:id"
              element={<SingleProduct user={user} />}
            />
            <Route
              path="/EditProduct/:id"
              element={<EditProduct user={user} token={token} />}
            />
            <Route
              path="/Checkout"
              element={<Checkout user={user} token={token} />}
            />
            <Route
              path="/Checkout"
              element={<Checkout user={user} token={token} />}
            />
          </Routes>
        </div>
      </header>
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    {" "}
    <App />{" "}
  </BrowserRouter>,
  document.getElementById("app")
);
