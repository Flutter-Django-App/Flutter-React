import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, CardGroup, CardColumns } from "react-bootstrap";


export default function UserProfilePage({user}) {
  const [allUsers, setAllUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  

//   useEffect(() => {
//     async function fetchUser() {
//       const { data } = await axios.get("/profile/");
//       setUser(data);
//     }
//     fetchUser();
//   }, []);

  useEffect(() => {
    async function fetchAllUsers() {
      const { data } = await axios.get("/allusers/");
      setAllUsers(data);
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await axios.get("/photos/");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  console.log(photos)
  console.log(user);
  console.log(allUsers)

  // users.map((user) => (

  //   )
  // )

  return (
    <div>
      <h1>Profile Page</h1>

      <CardGroup>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>
              <div>{user.username}</div>
              <div >Last Login: {new Date(user.last_login).toLocaleDateString()}</div>
            </Card.Title>
            <Card.Text>I love eating</Card.Text>
            <Card.Link>
              <div className="">
                <Link
                  className="btn btn-xs"
                  to={{
                    pathname: "/profile/update",
                    state: { user },
                  }}
                  user={user}
                >
                  EDIT PROFILE
                </Link>
              </div>
            </Card.Link>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Joined on {new Date(user.date_joined).toLocaleDateString()}
            </small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <Row>
        {photos.map((photo) => (
          <CardColumns>
            {photo.user === user.id ? (
            <Card className="my-3 p-3 rounded">
              <Card.Body as="div">
                <Card.Title as="div">
                  <strong>{photo.user}</strong>
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
                    Likes: {photo.total_likes} | Comments:{" "}
                    {photo.total_comments}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
         
         ) : (
           console.log('bye'))
          }
          </CardColumns>
        ))}
        </Row>
    </div>
  );
}
