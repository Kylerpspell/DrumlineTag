import React from 'react';
import { useState, useEffect } from 'react';
function TagLeaderboard () {
	const [drummers,setdrummers] = useState([]);
	const [leaderboard,setLeaderboard] = useState([]);
	const [sort, setSort] = useState("points");

	function getPoints(drummer) {
		return 3 *drummer.numtags - drummer.numtagged;
	}

	useEffect(() => {
		async function fetchDrummers(){
			fetch("http://localhost:5002/drummers")
			.then((r) => r.json())
			.then((drummers) => setdrummers(drummers));
		}
		fetchDrummers();
	}, []);

	useEffect(() => {
		let sorted = drummers.sort((a,b) => {
			if (sort === "tags") {
				return b.numtags - a.numtags;
			} else if (sort === "tagged") {
				return b.numtagged - a.numtagged;
			} else if (sort === "points") {
				return getPoints(b) - getPoints(a);
			}
		});
		setLeaderboard(sorted.map((drummer, i) => (
			<tr key={drummer._id}>
				<td>{i+1}</td>
				<td>{drummer.name}</td>
				<td>{drummer.year}</td>
				<td>{drummer.section}</td>
				<td>{drummer.numtags}</td>
				<td>{drummer.numtagged}</td>
				<td>{getPoints(drummer)}</td>
			</tr>
		)));
	}, [drummers, sort]);

	return (
		<div>
			<h1>Tag Leaderboard sorted by {sort}</h1>
			<table className='LeaderboardTable'>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Drummer</th>
						<th>Year</th>
						<th>Section</th>
						<th className="sortable" onClick={() => setSort("tags")}>Tags</th>
						<th className="sortable" onClick={() => setSort("tagged")}>Tagged</th>
						<th className="sortable" onClick={() => setSort("points")}>Points</th>
					</tr>
				</thead>
				<tbody>
					{leaderboard}
				</tbody>
			</table>
		</div>
	);
}

export default TagLeaderboard;