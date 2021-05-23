import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default function AddPhotoPage() {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    description: "",
    age: 0,
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/photos/create/", formData);
      console.log(res);
      history.push("photos");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Add Photo</h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Caption:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Caption"
            name="caption"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            name="location"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the image url"
            name="url"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Total Likes:</Form.Label>
          <Form.Control
            type="int"
            placeholder="Enter a number"
            name="url"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Total Comments:</Form.Label>
          <Form.Control
            type="int"
            placeholder="Enter a number"
            name="url"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Add Photo</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
