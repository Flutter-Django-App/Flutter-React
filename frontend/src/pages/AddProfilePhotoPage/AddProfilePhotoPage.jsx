import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AddProfilePhotoPage.css";
import { Form, Button } from "react-bootstrap";

export default function AddProfilePhotoPage({ user }) {
  const [showPhoto, setShowPhoto] = useState("Upload a Photo");
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
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
    const profile_photo_id = e.target.value;
    e.preventDefault();
    let proImg = "";
    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "hzvualup");
    await axios
      .post("https://api.cloudinary.com/v1_1/edithr2852/image/upload", imgData)
      .then((res) => {
        proImg = res.data.url;
      });
    const options = {
      url: `http://localhost:8000/profilephoto/${user.id}/add_profilephoto/`,
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      data: {
        user: user.id,
        url: proImg,
      },
    };
    try {
      const profilePhoto = await axios(options).then((response) => {
        console.log("Response for submission=>", response);
      });
    } catch {
      console.log("bleh");
    }
    history.push("/profile");
  };

  return (
    <>
      <h1>Hello</h1>
      <Form onSubmit={handleSubmit}>
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
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
