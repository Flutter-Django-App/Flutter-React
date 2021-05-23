import React from 'react';
import { Link } from 'react-router-dom';


import "./NavBar.css";

export default function NavBar() {

	// function handleLogOut() {
	// 	// Delegate to the users-service
	// 	userService.logOut();
	// 	// Update state will also cause a re-render
	// 	setUser(null);
	// }

	return (
		<nav className="ConversationList">
			<Link to='/photos' >Feed</Link>
			&nbsp; | &nbsp;
			<Link to='/addphoto' >Add Photo</Link>
			&nbsp; | &nbsp;
			<Link to='/profile' >Profile</Link>
			&nbsp; | &nbsp;
			<Link to=''  >
				Log Out
			</Link>
		</nav>
	);
}
