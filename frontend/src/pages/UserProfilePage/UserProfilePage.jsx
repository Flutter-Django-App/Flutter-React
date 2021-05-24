import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, CardGroup } from "react-bootstrap";

export default function IndexPage({user}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await axios.get("/photos/");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  console.log(user);

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
          <Col key={photo.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Body as="div">
                <Card.Title as="div">
                  <strong>{photo.user}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <div className="my-3">
                    <strong>Img URL: </strong>
                    {photo.url}
                  </div>
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
          </Col>
        ))}
      </Row>
    </div>
  );
}
