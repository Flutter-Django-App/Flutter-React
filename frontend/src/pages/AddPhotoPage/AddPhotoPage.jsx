import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './AddPhotoPage.css'
import { Form, Button } from "react-bootstrap";

export default function AddPhotoPage({user}) {
  const [showPhoto, setShowPhoto] = useState('Upload a Photo')
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    url: "",
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
      console.log(formData.url)
      // console.log(formData.caption)
      // console.log(formData.location)
      const res = await axios.post(`/photos/${user.id}/add_photo/`, formData);
      console.log(res);
      history.push("photos");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-photo">
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
            type="file"
            name="url"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" onChange={handleChange}>Add Photo</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
