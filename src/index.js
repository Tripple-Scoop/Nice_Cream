import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom'
import { Home, Activities, Login, Register, Routines } from './components/index';
import { fetchUser } from './api/users';

const App = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
  useEffect{
    
  }

}