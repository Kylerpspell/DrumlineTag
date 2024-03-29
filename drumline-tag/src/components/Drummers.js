import React from "react";
import { useNavigate } from "react-router-dom";
function Drummers() {
	const navigate = useNavigate();
	const [drummers, setDrummers] = React.useState([]);

	React.useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/drummers")
			.then((r) => r.json())
			.then((drummers) => setDrummers(drummers));
	}, []);

	function removeDrummer(id) {
		fetch('https://drumlinetagbackend.onrender.com/drummers/'+ id + '/remove', {
			method: "DELETE",
		}).then(() => {
			setDrummers(drummers.filter((drummer) => drummer._id !== id));
		});
		
	}

	function drummerTable() {
		return drummers.map((drummer) => (
			<tr key={drummer._id}>
				<td>{drummer.name}</td>
				<td>{drummer.section}</td>
				<td>{drummer.year}</td>
				{/* <td>
					<button onClick={() => removeDrummer(drummer._id)}>Remove</button>
				</td> */}
			</tr>
		));
	}

	return (
		<div>
			<table className="leaderboardTable">
				<thead>
					<tr>
						<th>Name</th>
						<th>Section</th>
						<th>Year</th>
					</tr>
				</thead>
				<tbody>{drummerTable()}</tbody>
			</table>
			{/* <button onClick={() => navigate("/drummers/add")}>Add Drummer</button> */}
		</div>
	);
}

export default Drummers;