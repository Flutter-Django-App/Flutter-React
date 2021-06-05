import React, { Component, useState, useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  useHistory,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import "./App.css";

import NavBar2 from "../../components/NavBar/NavBar2";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

import IndexPage from "../../pages/IndexPage/IndexPage";
import AddPhotoPage from "../../pages/AddPhotoPage/AddPhotoPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";
import AddProfilePhotoPage from "../AddProfilePhotoPage/AddProfilePhotoPage";

export default function App() {
  const [logged_in, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [profilePhoto, setProfilePhoto] = useState("Add a Profile Picure!");

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const options = {
          url: "http://localhost:8000/profile/",
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        };
        const res = await axios(options);
        const user = res.data;
        setUser(user);
      } else {
        history.push("/");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchProfilePhotos() {
      const options = {
        url: `http://localhost:8000/profilephoto/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios(options);
      setProfilePhoto(response.data);
    }
    fetchProfilePhotos();
  }, []);

  const handle_login = async (e, formData) => {
    e.preventDefault();
    const options = {
      url: "http://localhost:8000/token-auth/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: formData.username,
        password: formData.password,
      },
    };
    const response = await axios(options);
    const token = response.data.token;
    const user = response.data.user;
    localStorage.setItem("token", token);
    if (localStorage.getItem("token")) {
      setUser(user);
      setLoggedIn(true);
    }
  };

  const handle_signup = async (e, data) => {
    e.preventDefault();
    const options = {
      url: "http://localhost:8000/users/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        username: data.username,
      },
    };
    const response = await axios(options);
    const token = response.data.token;
    const user = {
      id: response.data.id,
      password: response.data.password,
      last_login: response.data.last_login,
      is_superuser: response.data.is_superuser,
      username: response.data.username,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      is_staff: response.data.is_staff,
      is_active: response.data.is_active,
      date_joined: response.data.date_joined,
      groups: response.data.groups,
      user_permissions: response.data.user_permissions,
    };
    localStorage.setItem("token", token);
    if (localStorage.getItem("token")) {
      setUser(user);
      setLoggedIn(true);
    }
  };

  const handle_logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser([]);
  };

  return (
    <Router>
      <NavBar2 logged_in={logged_in} handle_logout={handle_logout} />
      <Container id="window">
        <Route exact path="/">
          {!logged_in ? (
            <LoginForm handle_login={handle_login} />
          ) : (
            <IndexPage logged_in={logged_in} user={user} />
          )}
        </Route>
        <Route exact path="/photos">
          <IndexPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/photos/create">
          <AddPhotoPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/profile">
          <UserProfilePage
            logged_in={logged_in}
            user={user}
            profilePhoto={profilePhoto}
          />
        </Route>
        <Route exact path="/profile/update">
          <EditProfilePage
            logged_in={logged_in}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route exact path="/profile/photo">
          <AddProfilePhotoPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm handle_signup={handle_signup} />
        </Route>
        <Route exact path="/login">
          {logged_in ? (
            <IndexPage logged_in={logged_in} user={user} />
          ) : (
            <LoginForm handle_login={handle_login} />
          )}
        </Route>
      </Container>
    </Router>
  );
}
