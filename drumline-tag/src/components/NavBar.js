import { NavLink } from "react-router-dom";


function NavBar() {
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