import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Link, Route, useNavigate, } from "react-router-dom";
import { Home, Login, Checkout, Register, My_Cart, Profile, Products} from "./components";
import { fetchUser } from "./api/users";
import logo from './assets/images/Full_Logo_Transparent.png'

const App = () => {
  //Login State
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      setToken(localStorage.getItem("myToken"));
      fetchUser().then((result) => {
        setUser(result);
      });
    }
  }, []);

  useEffect(() => {
    console.log(user);  
  }, [user]);


  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("userToken");
    setUser('');
  };
  return (
    <div>
      <header>
        <nav className="nav">
          <div id="header_logo"><img src={logo} alt="logo" /></div>
          <div className="nav_links">
            <Link className="link" id="home_link" to="/Home"> Home </Link>
            <Link className="link" id="products_link" to="/Products"> Products </Link>
            {token === null ? null : <Link className="link" id="profile_link" to="/Profile"> My Profile</Link>}
            <Link className="link" id="cart_link" to="/My_Cart">My Cart</Link>

            {token === null
              ? (<Link to={'/Login'}>
                <img
                  id='header-button'
                  src="https://cdn-icons-png.flaticon.com/512/9403/9403338.png"
                ></img>
              </Link>)
              : (<Link id="logout" onClick={(event) => {
                event.preventDefault();
                removeToken();
                navigate("/Login")
              }}>
                <img
                  id='header-button'
                  src="https://cdn-icons-png.flaticon.com/512/9403/9403330.png"
                ></img>
              </Link>
              )}

          </div>
        </nav>

        <div>
          <Routes>
            <Route
              path="/Home"
              element={<Home user={user} token={token} />}
            />
            <Route
              path="/Login"
              element={<Login setToken={setToken} token={token} setUser={setUser} />}
            />
            <Route
              path="/Register"
              element={<Register setToken={setToken} setUser={setUser} user={user} token={token} />}
            />
            <Route
              path="/Profile"
              element={<Profile user={user} token={token} />}
            />
            <Route
              path="/My_Cart"
              element={<My_Cart user={user} token={token} />}
            />
            <Route
              path="/Products"
              element={<Products user={user} token={token} />}
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
