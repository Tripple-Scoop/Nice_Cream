import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
import { Login } from "./components";
import { fetchUser } from "./api/users";
const App = () => {
  //Login State
  const [token, setToken] = useState('');
  const [featuredActivity, setFeaturedActivity] = useState({});
  const [user, setUser] = useState('');
  const [featuredRoutine, setFeaturedRoutine] = useState({});
  const navigate = useNavigate();
  console.log(user);
  // const storeUser = (username, token) => {
  //   localStorage.setItem("auth_token", token);
  //   localStorage.setItem("username", username);
  //   setToken(token);
  //   console.log(username, token);
  //   setUsername(username);
  //   // navigate("/profile");
  // };

  // const App = () => {
  //   const [token, setToken] = useState("");
  //   const [user, setUser] = useState({});
  //   let navigate = useNavigate();
  //   console.log(user);
  useEffect(() => {
    // if(localStorage.getItem("myToken"))
    // then try to do this.  otherwise its setting null. 
    setToken(localStorage.getItem("myToken"));
    fetchUser().then((result) => {
      setUser(result);
    });
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
          <h1 className="mainTitle">Nice Cream</h1>
          <h2 className="Links">
            <div>
              <Link className="HomeLink" to="/Home">
                Home
              </Link>
            </div>
            <div>
              <Link className="FlavorLink" to="/Flavors">
                Flavors
              </Link>
            </div>
            <Link to="/Users">
              <div className="UsersLink">{token === null ? "" : "Users"}</div>
            </Link>
            <Link to="/Login">
              <div className="Logbutton">
                {token === null ? (
                  "Login"
                ) : (
                  <button className="logout" onClick={(event)=>{
                    event.preventDefault();
                    removeToken()}
                    }>
                    LogOut
                  </button>
                )}
              </div>
            </Link>
          </h2>
        </nav>

        <div>
          <Routes>
            {/* <Route path="/Home">
              <Home token={token} />
            </Route> */}
            <Route
              path="/Login"
              element={<Login setToken={setToken} token={token} setUser={setUser} />}
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
