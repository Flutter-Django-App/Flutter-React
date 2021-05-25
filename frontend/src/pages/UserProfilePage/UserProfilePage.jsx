import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserProfilePage.css";
import { Row, Col, Card, CardGroup, CardColumns } from "react-bootstrap";

export default function UserProfilePage({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [photos, setPhotos] = useState([]);

  //   useEffect(() => {
  //     async function fetchUser() {
  //       const { data } = await axios.get("/profile/");
  //       setUser(data);
  //     }
  //     fetchUser();
  //   }, []);

  // useEffect(() => {
  //   async function fetchAllUsers() {
  //     const { data } = await axios.get("/allusers/");
  //     setAllUsers(data);
  //   }
  //   fetchAllUsers();
  // }, []);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await axios.get("/photos/");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  console.log(photos);
  console.log(user);
  console.log(allUsers);

  // users.map((user) => (

  //   )
  // )

  return (
    <>
    <main className="profile-main pro-main pro-main-2">
    <div className="profile-1 profile-3 prof-1">
      {/* <h1> </h1> */}
      <header className="header-1">
        <CardGroup>
          <Card>
            <div className="profile-img-1">
              <div className="profile-img-2">
                <h1>
                  
                </h1>
                <img className="pic-prof" src="{photo.url}" />
                <span className="span-pic">
                  
                  </span>
              </div>
            </div>
            <section className="profile-sec">
                <div className="profile-div-1">
            <Card.Body>
              <Card.Title>
                <h2 className="user-name name name1 name-profile">{user.username}</h2>
                <br />
                <div className="user-name name name1 name-profile">
                  Last Login: {new Date(user.last_login).toLocaleDateString()}
                </div>
                <br />
              </Card.Title>
              {/* <Card.Text>I love eating</Card.Text> */}
              <div className="btn-1 btn-2 btn-3">
              <Card.Link>
                  <Link
                    className="btn btn-xs"
                    to={{
                      pathname: "/profile/update",
                      state: { user },
                    }}
                    user={user}
                  >
                    <button>Edit Profile</button>
                  </Link>
              </Card.Link>
              </div>
            </Card.Body>
                </div>
            </section>
            
            <Card.Footer>
              <small className="text-muted">
                Joined on {new Date(user.date_joined).toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </header>
      </div>

      <Row>
        {photos.map((photo) => (
          <CardColumns>
            {photo.user.id === user.id ? (
              <Card className="my-3 p-3 rounded">
                <Card.Body as="div">
                  <Card.Title as="div">
                    <strong>{photo.user.username}</strong>
                  </Card.Title>
                  <Card.Text as="div">
                    <img className="my-3" src={photo.url} />
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3">{photo.location}</div>
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3">{photo.caption}</div>
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3">
                      Likes: {photo.likes.length} | Comments:{" "}
                      {photo.comments.length}
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              console.log("bye")
              )}
          </CardColumns>
        ))}
      </Row>
    </main>
      </>
  );
}
