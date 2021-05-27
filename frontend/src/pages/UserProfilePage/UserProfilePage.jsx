import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
import "./UserProfilePage.css";
import {
  Row,
  Col,
  Card,
  CardGroup,
  Modal,
  Button,
} from "react-bootstrap";
export default function UserProfilePage({ user }) {
  // const [allUsers, setAllUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    console.log(e.target.value)
    setShow(true);
  }
  const history = useHistory();

  // useEffect(() => {
  //   async function fetchAllUsers() {
  //     const { data } = await axios.get("/allusers/");
  //     setAllUsers(data);
  //   }
  //   fetchAllUsers();
  // }, []);

  useEffect(() => {
    async function fetchPhotos() {
      const options = {
        url: `http://localhost:8000/photos/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
      const response = await axios(options);
      setPhotos(response.data);
    }
    fetchPhotos();
  }, []);

  // const handleDeletePhoto = async (e, photoId) => {
  //   e.preventDefault();
  //   const options = {
  //     url: `http://localhost:8000/photos/${photoId}/delete`,
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `JWT ${localStorage.getItem("token")}`,
  //     },
  //     data: {
  //       photo: photoId,
  //     },
  //   };
  //   const response = await axios(options);
  //   const token = response.data.token;
  //   const user = response.data.user;
  //   localStorage.setItem("token", token);
  //   if (localStorage.getItem("token")) {
  //     setPhotos(response);
  //   }
  // };
  const handleDeletePhoto = async (e) => {
    e.preventDefault();
    // const id = e.target.value
    const options = {
      url: `http://localhost:8000/photos/${e.target.value}/delete_photo/`, // maybe wrong
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: e.target.value,
      },
    };
    try {
      const slot = await axios(options).then((response) => {
        console.log('Response for submission=>', response);
      });
    } catch {
      console.log('bleh')
    }
    history.push("/profile");

  }
  // console.log(user)
  console.log(photos)
  
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
                    <h1></h1>
                    <img className="pic-prof" src="{photo.url}" />
                    <span className="span-pic"></span>
                  </div>
                </div>
                <section className="profile-sec">
                  <div className="profile-div-1">
                    <Card.Body>
                      <Card.Title>
                        <h2 className="user-name name name1 name-profile">
                          {user.username}
                        </h2>
                        <br />
                        <div className="user-name name name1 name-profile">
                          Last Login:{" "}
                          {new Date(user.last_login).toLocaleDateString()}
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
                            key={user.id}
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
        {photos.map((photo) => (
          
          <Row>
            {photo.user.id === user.id ? (
              
              <Card className="my-3 p-3 rounded">
                <Card.Body as="div">
                  <Card.Title as="div">
                    <Row>
                      <Col>
                        <strong>{photo.user.username}</strong>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <CardGroup>
                          <Button variant="contained" onClick={handleShow} value={photo.id}>
                            <svg
                              aria-label="More options"
                              className="_8-yf5 "
                              fillRule="#262626"
                              height="16"
                              viewBox="0 0 48 48"
                              width="16"
                            >
                              <circle
                                clipRule="evenodd"
                                cx="8"
                                cy="24"
                                fillRule="evenodd"
                                r="4.5"
                              ></circle>
                              <circle
                                clipRule="evenodd"
                                cx="24"
                                cy="24"
                                fillRule="evenodd"
                                r="4.5"
                              ></circle>
                              <circle
                                clipRule="evenodd"
                                cx="40"
                                cy="24"
                                fillRule="evenodd"
                                r="4.5"
                              ></circle>
                            </svg>
                          </Button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                              <Modal.Title>
                                Are you sure you want to delete this photo? {photo.id}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Cancel {photo.id}
                              </Button>
                              <Button
                                variant="primary"
                                // onClick={handleClose}
                                onClick={handleDeletePhoto}
                                value={photo.id}
                              >
                                Delete {photo.id}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </CardGroup>
                      </Col>
                    </Row>
                    <div className="my-3">{photo.location}</div>
                  </Card.Title>
                  <Card.Img as="div">
                    <img className="my-3" src={photo.url} />
                  </Card.Img>
                  <Card.Text as="div"></Card.Text>
                  <Card.Text as="div">
                    <div className="my-3">
                      <span>
                        <strong>{photo.user.username}</strong> {photo.caption} 
                      </span>
                    </div>
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3">
                      Likes: {photo.likes.length} | Comments: {photo.comments.length}
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              console.log("bye bye photo")
            )}
          </Row>
        ))}
      </main>
    </>
  );
}
