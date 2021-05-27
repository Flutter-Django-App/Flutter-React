import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './AddPhotoPage.css'
import { Form, Button } from "react-bootstrap";

axios.defaults.xsrfCookieName='csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    const photo_id = e.target.value
    // console.log(user.id)
    // console.log(photo_id)
    // console.log(formData.caption)
    // console.log(formData.location)
    // console.log(formData.url)
    e.preventDefault();
    const options = {
      url: `http://localhost:8000/photos/${user.id}/add_photo/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        photo: photo_id,
        user: user.id,
        caption: formData.caption, 
        location: formData.location,
        url: formData.url,
      },
    };
    try {
      const photo = await axios(options).then((response) => {
        console.log('Response for submission=>', response);
      });
    } catch {
      console.log('bleh')
    }
    history.push("/profile");
  }

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
