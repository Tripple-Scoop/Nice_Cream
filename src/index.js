import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom'
import { Login } from './components';
import { } from './api/users';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  let history = useHistory();
  console.log(user);
  useEffect(() => {
    setToken(localStorage.getItem('userToken'));
    fetchUser().then((result) => { setUser(result) });
  }, [])

  useEffect(() => {
    console.log("Change in user or token!")
  }, [user, token])


  return (
    <BrowserRouter>
      <div>
        <header>
          <nav className="nav">
            <h1 className="mainTitle">Nice Cream</h1>
            <h2 className="Links">
              <div><Link className="HomeLink" to="/Home">Home</Link></div>
              <div><Link className="FlavorLink" to="/Flavors">Flavors</Link></div>
              <Link to="/Users"><div className="UsersLink">
                {token === null ? '' : 'Users'}
              </div></Link>
              <Link to="/Login">
                <div className="Logbutton">
                  {token === null ? "Login" : <button className="logout" onClick={removeToken}>LogOut</button>}
                </div>
              </Link>
            </h2>
          </nav>

          <div>
            <Switch>
              <Route path="/Home">
                <Home token={token} />
              </Route>
              <Route exact path="/Login">
                <Login setToken={setToken} token={token} />
              </Route>
            </Switch>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));