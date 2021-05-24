import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get("/profile/");
      setUser(data);
    }
    fetchUser();
  }, []);

  const handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
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
        setUsername(json.user.username);
        setUser(json.user);
      });
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
        setUser(json.user);
      });
  };

  const handle_logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
  };

  console.log(localStorage.getItem("token"));
  console.log(username);
  console.log(user);
  console.log(logged_in);

  return (
    <Router>
      <NavBar2 logged_in={logged_in} handle_logout={handle_logout} />
      <Container>
        <Route exact path="/">
          <HomePage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/photos">
          <IndexPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/photos/create">
          <AddPhotoPage logged_in={logged_in} user={user} />
        </Route>
        <Route exact path="/profile">
          <UserProfilePage logged_in={logged_in} user={user} />
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

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displayed_form: '',
//       logged_in: localStorage.getItem('token') ? true : false,
//       username: localStorage.getItem('token') ? localStorage.getItem('token').username : " ",
//     };
//   }

//   componentDidMount() {
//     if (this.state.logged_in) {
//       fetch('http://localhost:8000/current_user/', {
//         headers: {
//           Authorization: `JWT ${localStorage.getItem('token')}`
//         }
//       })
//         .then(res => res.json())
//         .then(json => {
//           this.setState({ username: json.username });
//         });
//     }
//   }

//   handle_login = (e, data) => {
//     e.preventDefault();
//     fetch('http://localhost:8000/token-auth/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(json => {
//         localStorage.setItem('token', json.token);
//         this.setState({
//           logged_in: true,
//           displayed_form: '',
//           username: json.user.username
//         });
//       });
//   };

//   handle_signup = (e, data) => {
//     e.preventDefault();
//     fetch('http://localhost:8000/users/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//       .then(res => res.json())
//       .then(json => {
//         localStorage.setItem('token', json.token);
//         this.setState({
//           logged_in: true,
//           displayed_form: '',
//           username: json.username
//         });
//       });
//   };

//   handle_logout = () => {
//     localStorage.removeItem('token');
//     this.setState({ logged_in: false, username: '' });
//   };

//   display_form = form => {
//     this.setState({
//       displayed_form: form
//     });
//   };

//   render() {
//     let form;
//     switch (this.state.displayed_form) {
//       case 'login':
//         form = <LoginForm handle_login={this.handle_login} />;
//         break;
//       case 'signup':
//         form = <SignupForm handle_signup={this.handle_signup} />;
//         break;
//       default:
//         form = null;
//     }

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
//           {this.state.logged_in
//             ? `Hello, ${this.state.username}`
//             : 'Please Log In'}
//         </h3>
//         <Container>
//           <Route path="/" component={HomePage} exact />
//           <Route path="/photos" component={IndexPage} exact />
//           <Route path='/photos/create' component={AddPhotoPage} />
//           <Route path="/profile" component={UserProfilePage} exact />
//           <Route path="/profile/update" component={EditProfilePage} exact />
//         </Container>
//       </main>
//       </Router>
//     );
//   }
// }

// export default App;
