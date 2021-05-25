import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

import "./App.css";

import NavBar from "../../components/NavBar/NavBar"; // using NavBar2 currently
import NavBar2 from "../../components/NavBar/NavBar2";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

import HomePage from "../../pages/HomePage/HomePage";
import IndexPage from "../../pages/IndexPage/IndexPage";
import AddPhotoPage from "../../pages/AddPhotoPage/AddPhotoPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";

export default function App() {
  const [logged_in, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token").username : " "
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token").id : " "
  );
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get("/profile/");
      setUser(data);
    }
    fetchUser();
  }, []);
  
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
      setUsername(user.username); // might be redundant
      setUser(user);
      setLoggedIn(true);
    }
  };


  const handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        setLoggedIn(true);
        setUsername(json.username);
        setUserId(json.id);
        setUser(json.user);
        window.location.href = "/photos";
      });
  };

  
  const handle_logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
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
          <HomePage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/photos">
          <IndexPage logged_in={logged_in} user={user} userId={userId}  allUsers={allUsers}/>
        </Route>
        <Route exact path="/photos/create">
          <AddPhotoPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/profile">
          <UserProfilePage logged_in={logged_in} user={user} allUsers={allUsers} />
        </Route>
        <Route exact path="/profile/update">
          <EditProfilePage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm handle_signup={handle_signup} />
        </Route>
        <Route exact path="/login">
          <LoginForm handle_login={handle_login} />
        </Route>
      </Container>
    </Router>
  );
}
