import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css"

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Form from "./components/Form/Form"
import Dashboard from "./components/Dashboard/Dashboard"
import Modal from "./components/Modal/Modal"
import Favorites from "./components/Favorites/Favorites";

const App = () => {
  const { authData } = useSelector((state) => state.auth)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [authData])

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/upload' exact component={() => (user ? <Form /> : <Redirect to='/auth' />)} />
          <Route path='/posts/edit/:id' exact component={() => (user ? <Form /> : <Redirect to='/auth' />)} />
          <Route path='/posts/dashboard' exact component={() => (user ? <Dashboard /> : <Redirect to='/auth' />)} />
          <Route path='/posts/favorites' exact component={() => (user ? <Favorites /> : <Redirect to='/auth' />)} />
          <Route path='/posts/:id' exact component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
        </Switch>
      </div>
      <div className="modal-container">
        <Modal />
      </div>
    </BrowserRouter>
  );
}

export default App