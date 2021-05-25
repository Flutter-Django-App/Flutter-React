import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar2({ logged_in, handle_logout }) {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          {logged_in ? (
            <>
          <LinkContainer to="/">
            <Navbar.Brand>Flutter</Navbar.Brand>
          </LinkContainer>
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
           <h1> </h1>
          )}
        </Container>
      </Navbar>
    </header>
  );
}
