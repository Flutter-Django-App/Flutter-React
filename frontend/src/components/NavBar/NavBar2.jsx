import React, { Profiler } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  RiHomeHeartFill,
  RiImageAddFill,
  RiLogoutBoxRLine,
} from "react-icons/all";

export default function NavBar2({ logged_in, handle_logout }) {
  return (
    <div>
      {logged_in ? (
        <>
          <div className="nav-b2 nav-bar2">
            <div className="nav-bar nav-b">
              <div className="nav-3">
                <a class="a-nav" href="/photos">
                  <div className="nav-4">
                    <div className="nav-5">
                      <img
                        className="nav-logo"
                        src="https://i.imgur.com/bfjUjgq.png"
                        width="140px"
                        height="50px"
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div className="nav-6">
                <Navbar>
                  <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                      <Nav>
                        <div className="icon-div">
                          <LinkContainer to="/photos">
                            <Nav.Link>
                              <img src="https://i.imgur.com/CaEnz7X.png" height="30px" width="30px" />
                            </Nav.Link>
                          </LinkContainer>
                        </div>
                        <div className="icon-div" >
                          <div>
                            <LinkContainer to="/photos/create">
                              <Nav.Link>
                              <img 
                              className="icons"
                              src="https://i.imgur.com/HrDkVxj.png" height="30px" width="30px" />
                              </Nav.Link>
                            </LinkContainer>
                          </div>
                        </div>
                        <div className="icon-div">
                          <div>
                            <LinkContainer to="/profile">
                              <Nav.Link>
                                <img
                                  className="icons"
                                  src="image"
                                  to="/profile/"
                                  height="30px" width="30px"
                                />
                              </Nav.Link>
                            </LinkContainer>
                          </div>
                        </div>
                        <div className="icon-div">
                          <div>
                            <LinkContainer to="/login">
                              <Nav.Link onClick={handle_logout}>
                              <img className="profile-pic icons" src="https://i.imgur.com/z9msD3g.png?1" height="30px" width="30px"/>
                              </Nav.Link>
                            </LinkContainer>
                          </div>
                        </div>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1> </h1>
      )}
    </div>
  );
}
