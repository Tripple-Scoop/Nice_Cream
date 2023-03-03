import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom'
import { Login} from './components/index';
import { fetchUser } from './api/users';

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

}