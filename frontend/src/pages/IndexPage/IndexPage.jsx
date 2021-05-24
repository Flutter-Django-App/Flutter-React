import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";


export default function IndexPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      const { data } = await axios.get("photos/");
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  console.log(photos);

  return (
    <div class="col align-self-center">
      <h1>Photos Index Page</h1>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Card.Body as="div">
                <Card.Title as="div">
                  <strong>{photo.user}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <img src={photo.url} />
                </Card.Text>
                <Card.Text as="div">
                    <div className="my-3">
                        {photo.location}
                    </div>
                </Card.Text>
                <Card.Text as="div">
                    <div className="my-3">
                        {photo.caption}
                    </div>
                </Card.Text>
                <Card.Text as="div">
                    <div className="my-3">
                        Likes: {photo.total_likes} | Comments: {photo.total_comments}
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
