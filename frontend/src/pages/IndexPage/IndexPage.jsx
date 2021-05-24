import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function IndexPage() {
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [formData, setFormData] = useState({
    comment: "",
  });
  const history = useHistory();

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await axios.get("photos/");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      const { data } = await axios.get("comments/");
      setComments(data);
    }
    fetchComments();
  }, []);

  useEffect(() => {
    async function fetchLikes() {
      const { data } = await axios.get("likes/");
      setLikes(data);
    }
    fetchLikes();
  }, []);

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
    e.preventDefault();
    try {
      const res = await axios.post("comments/create/", formData);
      console.log(res);
      history.push("comments");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(photos);
  console.log(comments);
  console.log(likes);
  console.log(formData);

  return (
    <div className="col align-self-center">
      <h1>Photos Index Page</h1>

      <Row>
        {photos.map((photo) => (
      <CardGroup>
      <Card className="my-3 p-3 rounded">
              <Card.Body as="div">
                <Card.Title as="div">
                  <strong>{photo.user}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <img src={photo.url} />
                  <div className="my-3">{photo.location}</div>
                </Card.Text>
                <Card.Text as="div">
                  <div className="my-3">
                    <strong>Img URL: </strong>
                    {photo.url}
                  </div>

                </Card.Text>
                <Card.Text as="div">
                  <div className="my-3">
                    <span>
                      <strong>{photo.user}</strong> {photo.caption}
                    </span>
                  </div>
                </Card.Text>
                <Card.Text as="div">
                  <div className="my-3">Likes: {likes.length}</div>
                </Card.Text>
                <Card.Text as="div">
                  {comments.map((comment) => (
                    <>
                      {comment.photo === photo.id ? (
                        <div className="my-3">
                          <span>
                            <strong>{comment.user}</strong> {comment.comment}{" "}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <strong>{photo.user}</strong>
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
                    >
                      Send
                    </Button>
                  </Form.Group>
                </Form>
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
  );
}
