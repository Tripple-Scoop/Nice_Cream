import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Link, Route, useNavigate, } from "react-router-dom";
import { Login } from "./components";
import { fetchUser } from "./api/users";
import logo from './assets/images/Full_Logo_Transparent.png'

const App = () => {
  //Login State
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      setToken(localStorage.getItem("myToken"));
      fetchUser().then((result) => {
        setUser(result);
      });
    }
    // then try to do this.  otherwise its setting null. 

    console.log(user)

  }, []);

  useEffect(() => {
    console.log("Change in user or token!");
  }, [user, token]);


  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("userToken");
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
              ?   (<Link className="link" to="/Login">Log In</Link>)
              : ( <button id="logout" className="link" onClick={(event) => {
                  event.preventDefault();
                  removeToken()
                }}> Log Out </button>
              )}
            
          </div>
        </nav>

        <div>
          <Routes>
            {/* <Route path="/Home">
              <Home token={token} />
            </Route> */}
            <Route
              path="/Home"
              element={<Login user={user} token={token} />}
            />
            <Route
              path="/Login"
              element={<Login setToken={setToken} token={token} setUser={setUser} />}
            />
            <Route
              path="/Register"
              element={<Login setToken={setToken} setUser={setUser} user={user} token={token} />}
            />
            <Route
              path="/Profile"
              element={<Login user={user} token={token} />}
            />
            <Route
              path="/My_Cart"
              element={<Login user={user} token={token} />}
            />
            <Route
              path="/Products"
              element={<Login user={user} token={token} />}
            />
            <Route
              path="/Checkout"
              element={<Login user={user} token={token} />}
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
