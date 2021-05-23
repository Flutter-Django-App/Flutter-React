import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import axios from "axios";
import React, { useState, useEffect } from "react";

import "./NavBar.css";

export default function NavBar() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function fetchUser() {
          const { data } = await axios.get("/profile/");
          setUser(data);
        }
        fetchUser();
      }, []);

	// function handleLogOut() {
	// 	// Delegate to the users-service
	// 	userService.logOut();
	// 	// Update state will also cause a re-render
	// 	setUser(null);
	// }

	return (
        <header>
        <Navbar bg="dark" variant='dark' expand='lg' collapseOnSelect>
            {/* <Container> */}
                <LinkContainer to="/">
                        <Navbar.Brand>Flutter Home</Navbar.Brand>
                </LinkContainer>
                {/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
                <Navbar id='basic-navbar-nav'>
                    <Nav className="mr-auto">
                            <LinkContainer to='/photos'>
                                <Nav.Link>
                                    Photo Feed
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/photos/create'>
                                <Nav.Link>
                                    Add a Photo
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/profile'>
                                <Nav.Link>
                                    Profile
                                </Nav.Link>
                            </LinkContainer>
                    </Nav>
                </Navbar>
            {/* </Container> */}
        </Navbar>
    </header>
	);
}



