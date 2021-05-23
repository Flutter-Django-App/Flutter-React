import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "./EditProfilePage.css";
import { Form, Button } from "react-bootstrap";

export default function EditProfilePage({ user }) {
    console.log(user)
  const location = useLocation();

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState(location.state.user);

  const formRef = useRef();
  const history = useHistory();

  useEffect(() => {
    formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hitting");
      const res = await axios.put("/profile/update/", formData);
      console.log(res);
      history.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.first_name]: e.target.value,
      [e.target.first_name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Edit Profile</h1>

      <section className="_9eogI E3X2T">
        <main className="SCxLW o64aR">
          <div className="BcMHM EzUlV XfvCs">
            <ul className="wW1cu">
              <li>
                <a className="h-aRd -HRM- " href="profile/update" tabIndex="0">
                  Edit Profile
                </a>
              </li>
              <li>
                <a
                  className="h-aRd  fuQUr"
                  href="/profile/password/change/"
                  tabIndex="0"
                >
                  Change Password
                </a>
              </li>
            </ul>

            <Form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
              {/* <h1>{user.username}</h1> */}
              <div className="form-group">
                <label>Username </label>
                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>First Name </label>
                <input
                  className="form-control"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="btn btn-xs"
                disabled={invalidForm}
              >
                SAVE Profile
              </Button>
              &nbsp;&nbsp;
              <Link to="/profile">CANCEL</Link>
            </Form>
          </div>
        </main>
      </section>
    </>
  );
}
