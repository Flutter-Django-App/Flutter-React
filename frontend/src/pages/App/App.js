import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import "./App.css";

import NavBar from "../../components/NavBar/NavBar"; // using NavBar2 currently
import NavBar2 from "../../components/NavBar/NavBar2";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

import HomePage from "../../pages/HomePage/HomePage"; // Do not need this page
import IndexPage from "../../pages/IndexPage/IndexPage";
import AddPhotoPage from "../../pages/AddPhotoPage/AddPhotoPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function App() {
  const [logged_in, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState([]);
  
  // const [username, setUsername] = useState(
  //   localStorage.getItem("token") ? localStorage.getItem("token").username : " "
  // );
  // const [userId, setUserId] = useState(
  //   localStorage.getItem("token") ? localStorage.getItem("token").id : " "
  // );
  // const [allUsers, setAllUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const options = {
  //       url: "http://localhost:8000/profile/",
  //       method: "GET",
  //       headers: {
  //         Authorization: `JWT ${localStorage.getItem("token")}`,
  //       }
  //     }
  //     const data = await axios.get("/profile/");
  //     console.log(data)
  //     // setUser(data);
  //   }
  //   fetchUser();
  // }, []);
  
  // useEffect(() => {
  //   async function fetchAllUsers() {
  //     const { data } = await axios.get("/allusers/");
  //     setAllUsers(data);
  //     console.log(allUsers)
  //   }
  //   fetchAllUsers();
  // }, [allUsers]);

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
    const options ={
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
      }
    }
    const response = await axios(options)
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
    }
    localStorage.setItem("token", token);
    if (localStorage.getItem("token")) {
      setUser(user);
      setLoggedIn(true);
    }
  }
  
  const handle_logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser([]);
    // setUsername("");
  };

  // console.log(localStorage.getItem("token"));
  // console.log(username);

  // console.log(user);
  // console.log(logged_in);

  //     console.log(localStorage.getItem('token'))
  //     console.log(this.state.username)
  //     console.log(this.state.logged_in)
  //     console.log(this.state)

  //     return (
  //       <Router>
  //       <main className="App">
  //         <NavBar
  //           logged_in={this.state.logged_in}
  //           display_form={this.display_form}
  //           handle_logout={this.handle_logout}
  //         />
  //         {form}
  //         <h3>
  //           {this.state.logged_in ? (
  //             <>
  //               <div>Hello, {this.state.username}</div>
  //               <Container>
  //                 <Route path="/" component={HomePage} exact />
  //                 <Route path="/photos" component={IndexPage} exact />
  //                 <Route path='/photos/create' component={AddPhotoPage} />
  //                 <Route path="/profile" component={UserProfilePage} exact />
  //                 <Route path="/profile/update" component={EditProfilePage} exact />
  //               </Container>
  //               </>
  //           ) : (
  //             <div>Please Log In</div>
  //             )}
  //         </h3>
  //       </main>
  // </Router>
  //     );
  //   }

  return (
    <Router>
      <NavBar2 logged_in={logged_in} handle_logout={handle_logout} />
      <Container>
        
        <Route exact path="/">
          {!logged_in ? (
            <LoginForm handle_login={handle_login} />
            // <HomePage logged_in={logged_in} user={user} />
            ) : (
            <IndexPage logged_in={logged_in} user={user} /*userId={userId}*/  /*allUsers={allUsers}*/ />
          )}
        </Route>
        <Route exact path="/photos">
          <IndexPage logged_in={logged_in} user={user} /*userId={userId} allUsers={allUsers}*/ />
        </Route>
        <Route exact path="/photos/create">
          <AddPhotoPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/profile">
          <UserProfilePage logged_in={logged_in} user={user} /*allUsers={allUsers}*/ />
        </Route>
        <Route exact path="/profile/update">
          <EditProfilePage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm handle_signup={handle_signup} />
        </Route>
        <Route exact path="/login">
          {logged_in ? (
            <IndexPage logged_in={logged_in} user={user} /*userId={userId}  allUsers={allUsers}*/ />
          ):(
            <LoginForm handle_login={handle_login} />
          )}
        </Route>
      </Container>
    </Router>
  );
}
