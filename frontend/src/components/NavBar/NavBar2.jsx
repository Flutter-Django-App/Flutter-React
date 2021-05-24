import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar2({ logged_in, handle_logout }) {
  return (
    <header>
      <Navbar bg="dark" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Flutter</Navbar.Brand>
          </LinkContainer>
          {logged_in ? (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <LinkContainer to="/photos">
                    <Nav.Link>All Photos</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/photos/create">
                    <Nav.Link>Add a Photo</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>My Profile</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link onClick={handle_logout}>
                      Log Out
                    </Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <Nav className="mr-auto">
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Container>
      </Navbar>
    </header>
  );
}
