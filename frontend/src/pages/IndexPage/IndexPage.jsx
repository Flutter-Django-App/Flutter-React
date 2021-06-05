import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IndexPage.css";
import {
  Row,
  Card,
  CardGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import LikeButton from "./../../components/LikeButton/LikeButton";
import SaveButton from "./../../components/SaveButton/SaveButton";
import CommentButton from "./../../components/CommentButton/CommentButton";

export default function IndexPage({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
  };
  const [showLikes, setShowLikes] = useState(false);
  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = (e) => {
    setShowLikes(true);
  };
  const history = useHistory();

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newComment !== "") {
        handleSubmit(newComment);
        setNewComment("");
      }
    }
  };

  const handleSubmit = async (e) => {
    const photo_id = e.target.value;
    e.preventDefault();
    const options = {
      url: `http://localhost:8000/comments/${user.id}/create/${photo_id}/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: photo_id,
        user: user.id,
        comment: newComment,
      },
    };
    try {
      const comment = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    const options = {
      url: `http://localhost:8000/comments/${e.target.value}/delete_comment/`,
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: e.target.value,
      },
    };
    try {
      const photos = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };

  useEffect(() => {
    async function fetchAllUsers() {
      const options = {
        url: `http://localhost:8000/allusers/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      try {
        const allUsers = await axios(options).then((response) => {
          console.log("Response for submission=>", response);
          setAllUsers(response.data);
        });
      } catch {
        console.log("bleh");
      }
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    async function fetchPhotos() {
      const options = {
        url: `http://localhost:8000/photos/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios(options);
      setPhotos(response.data);
      history.push("/photos/");
    }
    fetchPhotos();
  }, []);

  const handleLike = async (e) => {
    const photo_id = e.target.value;
    e.preventDefault();
    const options = {
      url: `http://localhost:8000/likes/${user.id}/create/${photo_id}/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: photo_id,
        user: user.id,
      },
    };
    try {
      const like = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/");
  };

  return (
    <section className="index-pg ind-pg">
      <div className="ind-div">
        <Row>
          {photos.map((photo) => (
            <CardGroup>
              <Card className="my-3 p-3 rounded">
                <Card.Body as="div">
                  <Card.Title as="div">
                    <strong>{photo.user.username}</strong>
                  </Card.Title>
                  <Card.Text as="div">
                    <div className="my-3">{photo.location}</div>
                    <img src={photo.url} />
                  </Card.Text>

                  <Form
                    as="div"
                    onSubmit={handleLike}
                    class="flexbox-container"
                  >
                    <LikeButton user={user} photo_id={photo.id} photo={photo} />
                    <CommentButton
                      user={user}
                      photo_id={photo.id}
                      photo={photo}
                      handleNewCommentChange={handleNewCommentChange}
                      handleKeyUp={handleKeyUp}
                      handleSubmit={handleSubmit}
                    />
                    <SaveButton user={user} photo_id={photo.id} photo={photo} />
                  </Form>
                  <Card.Text as="div">
                    <div className="my-3">
                      <span>
                        <strong>{photo.user.username}</strong> {photo.caption}
                      </span>
                    </div>
                  </Card.Text>
                  <Card.Text as="div">
                    <div className="my-3" onClick={handleShow} class="myDIV">
                      Likes: {photo.likes.length}
                    </div>
                  </Card.Text>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>
                        <strong>Likes</strong>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <img src={photo.url} />

                      {photo.likes.map((like) => (
                        <span>
                          <h2
                            id="likedusers"
                            className="user-name name name1 name-profile"
                          >
                            {
                              allUsers.find(
                                (element) => (element = `${like.user}`)
                              ).username
                            }
                          </h2>
                        </span>
                      ))}
                    </Modal.Body>
                  </Modal>
                  <Card.Text as="div">
                    {photo.comments.map((comment) => (
                      <>
                        {comment.photo === photo.id ? (
                          <div className="my-3">
                            <span>
                              <strong>
                                {
                                  allUsers.find(
                                    (element) => (element = `${comment.user}`)
                                  ).username
                                }
                              </strong>
                              {comment.comment}{" "}
                              <CardGroup>
                                <Button
                                  variant="contained"
                                  onClick={handleShowLikes}
                                  value={comment.id}
                                >
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
                                {showLikes ? (
                                  <>
                                    <Button
                                      variant="contained"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="light"
                                      onClick={handleDeleteComment}
                                      value={comment.id}
                                    >
                                      Delete
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                              </CardGroup>
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </Card.Text>
                  <section class="com-sec comment">
                    <div className="comment-sec">
                      <Form className="form-com" onSubmit={handleSubmit}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Enter Comment"
                            name="name"
                            onChange={handleNewCommentChange}
                            onKeyUp={handleKeyUp}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Button
                            disabled={!newComment}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            value={photo.id}
                          >
                            Post
                          </Button>
                        </Form.Group>
                      </Form>
                    </div>
                  </section>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    posted {new Date(photo.created_date).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          ))}
        </Row>
      </div>
    </section>
  );
}
