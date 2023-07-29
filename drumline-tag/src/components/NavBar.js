import { NavLink, useLocation } from "react-router-dom";
import { React, useEffect } from "react";


function NavBar() {
	const location = useLocation();

	useEffect(() => {
		const navList = document.querySelector(".NavList");
		const navItems = navList.querySelectorAll(".NavItem");
		navItems.forEach((item) => {
			console.log(item.innerText.toLowerCase(), location.pathname.slice(1).toLowerCase());
			console.log(item.innerText.toLowerCase() === location.pathname.slice(1).toLowerCase());
			if (item.innerText.toLowerCase() === location.pathname.slice(1).toLowerCase()) {
				item.classList.add("active");
			} else {
				item.classList.remove("active");
			}
		});
	}, [location]);
	
	return (
		<div className="NavBar">
			<ul className="NavList">
				{/* <NavLink to="/">
					<li className="NavItem">Home</li>
				</NavLink> */}
				<NavLink to="/leaderboard">
					<li className="NavItem">Leaderboard</li>
				</NavLink>
				<NavLink to="/feed">
					<li className="NavItem">Feed</li>
				</NavLink>
				<NavLink to="/drummers">
					<li className="NavItem">Drummers</li>
				</NavLink>
			</ul>
		</div>
	);
}
export default NavBar;