import React from 'react';
import { useState, useEffect } from 'react';
function TagLeaderboard () {
	const drummers = [
		{'drummer': 'Alice Williams', 'year': '2024', 'section': 'Snares', 'numTags': 22, 'numtagged': 26},
		{'drummer': 'Tom Jones', 'year': '2023', 'section': 'Tenors', 'numTags': 8, 'numtagged': 19}, 
		{'drummer': 'Alice Miller', 'year': '2024', 'section': 'Snares', 'numTags': 5, 'numtagged': 9}, 
		{'drummer': 'John Moore', 'year': '2023', 'section': 'Cymbals', 'numTags': 15, 'numtagged': 19}, 
		{'drummer': 'Bob Brown', 'year': '2025', 'section': 'Cymbals', 'numTags': 7, 'numtagged': 23}, 
		{'drummer': 'Jim Miller', 'year': '2024', 'section': 'Basses', 'numTags': 3, 'numtagged': 6}, 
		{'drummer': 'John Wilson', 'year': '2024', 'section': 'Snares', 'numTags': 3, 'numtagged': 21},
		{'drummer': 'Bill Jones', 'year': '2025', 'section': 'Snares', 'numTags': 10, 'numtagged': 17},
		{'drummer': 'Bill Smith', 'year': '2025', 'section': 'Cymbals', 'numTags': 22, 'numtagged': 5}, 
		{'drummer': 'Sue Smith', 'year': '2024', 'section': 'Cymbals', 'numTags': 19, 'numtagged': 17}, 
		{'drummer': 'Jane Smith', 'year': '2025', 'section': 'Tenors', 'numTags': 8, 'numtagged': 19}, 
		{'drummer': 'John Wilson', 'year': '2025', 'section': 'Snares', 'numTags': 29, 'numtagged': 30}, 
		{'drummer': 'Jim Moore', 'year': '2023', 'section': 'Tenors', 'numTags': 12, 'numtagged': 7}, 
		{'drummer': 'Jane Anderson', 'year': '2026', 'section': 'Tenors', 'numTags': 29, 'numtagged': 16}, 
		{'drummer': 'Jane Williams', 'year': '2023', 'section': 'Basses', 'numTags': 17, 'numtagged': 6}, 
		{'drummer': 'Joe Jones', 'year': '2025', 'section': 'Snares', 'numTags': 2, 'numtagged': 11}, 
		{'drummer': 'Jane Wilson', 'year': '2026', 'section': 'Cymbals', 'numTags': 1, 'numtagged': 2}, 
		{'drummer': 'Jim Smith', 'year': '2024', 'section': 'Snares', 'numTags': 28, 'numtagged': 4}, 
		{'drummer': 'Sue Moore', 'year': '2024', 'section': 'Basses', 'numTags': 2, 'numtagged': 0}, 
		{'drummer': 'Jim Jones', 'year': '2023', 'section': 'Tenors', 'numTags': 20, 'numtagged': 9}, 
		{'drummer': 'Jane Taylor', 'year': '2024', 'section': 'Cymbals', 'numTags': 21, 'numtagged': 4}, 
		{'drummer': 'Sue Taylor', 'year': '2026', 'section': 'Tenors', 'numTags': 6, 'numtagged': 19}, 
		{'drummer': 'Alice Miller', 'year': '2025', 'section': 'Snares', 'numTags': 6, 'numtagged': 1}, 
		{'drummer': 'Joe Jones', 'year': '2024', 'section': 'Snares', 'numTags': 26, 'numtagged': 23}, 
		{'drummer': 'Bob Anderson', 'year': '2025', 'section': 'Cymbals', 'numTags': 7, 'numtagged': 13}, 
		{'drummer': 'Mary Williams', 'year': '2025', 'section': 'Basses', 'numTags': 13, 'numtagged': 17}, 
		{'drummer': 'Sue Anderson', 'year': '2026', 'section': 'Tenors', 'numTags': 14, 'numtagged': 22}, 
		{'drummer': 'Jane Moore', 'year': '2023', 'section': 'Tenors', 'numTags': 9, 'numtagged': 19}, 
		{'drummer': 'Jim Jones', 'year': '2024', 'section': 'Tenors', 'numTags': 29, 'numtagged': 17}, 
		{'drummer': 'John Miller', 'year': '2026', 'section': 'Cymbals', 'numTags': 6, 'numtagged': 11}
	];

	function getPoints(drummer) {
		return 3 *drummer.numTags - drummer.numtagged;
	}
	const [leaderboard,setLeaderboard] = useState([]);

	const [sort, setSort] = useState("points");

	useEffect(() => {
		let sortedDrummers = [...drummers];
		if (sort === "tags") {
			sortedDrummers.sort((a, b) => b.numTags - a.numTags);
		} else if (sort === "tagged") {
			sortedDrummers.sort((a, b) => b.numtagged - a.numtagged);
		} else if (sort === "points") {
			sortedDrummers.sort((a, b) => getPoints(b) - getPoints(a));
		}
		setLeaderboard(sortedDrummers.map((drummer, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{drummer.drummer}</td>
					<td>{drummer.year}</td>
					<td>{drummer.section}</td>
					<td>{drummer.numTags}</td>
					<td>{drummer.numtagged}</td>
					<td>{getPoints(drummer)}</td>
				</tr>
			);
		}));
	}, [sort]);

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