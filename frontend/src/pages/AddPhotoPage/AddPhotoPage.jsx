import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddPhotoPage.css";
import { Form, Button } from "react-bootstrap";

export default function AddPhotoPage({ user }) {
  const [showPhoto, setShowPhoto] = useState("Upload a Photo");
  const [image, setImage] = useState("");
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
    const photo_id = e.target.value;
    e.preventDefault();
    let img = "";
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ggurtht8");
    await axios
      .post(
        "https://api.cloudinary.com/v1_1/edithr2852/image/upload",
        imageData
      )
      .then((res) => {
        img = res.data.url;
      });
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
        url: img,
      },
    };
    try {
      const photo = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/profile");
  };

  return (
    <div className="add-photo ind-pg">
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
            onChange={(evt) => {
              setImage(evt.target.files[0]);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" onChange={handleChange}>
            Add Photo
          </Button>{" "}
        </Form.Group>
      </Form>
    </div>
  );
}
