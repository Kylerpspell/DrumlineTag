import React from 'react';
import { useState, useEffect } from 'react';
function TagLeaderboard () {
	const [tags, setTags] = useState([]);
	const [drummers, setDrummers] = useState([]);
	const [tagLeaderboard, setTagLeaderboard] = useState([]);

	useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/tags")
			.then((r) => r.json())
			.then((tags) => setTags(tags));

		fetch("https://drumlinetagbackend.onrender.com/drummers")
			.then((r) => r.json())
			.then((drummers) => setDrummers(drummers));
	}, []);

	useEffect(() => {
		let tagLeaderboard = [];
		drummers.forEach((drummer) => {
			let totalPoints = 0;
			tags.forEach((tag) => {
				if (tag.tagger === drummer._id) {
					totalPoints += 3;
				}
				if (tag.tagged === drummer._id) {
					totalPoints -= 1;
				}
			});
			tagLeaderboard.push({ name: drummer.name, totalPoints: totalPoints });
		});
		tagLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
		setTagLeaderboard(tagLeaderboard);
	}, [tags, drummers]);

	return (
		<div>
			<table className='leaderboardTable'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Total Points</th>
					</tr>
				</thead>
				<tbody>
					{tagLeaderboard.map((drummer) => (
						<tr key={drummer.name}>
							<td>{drummer.name}</td>
							<td>{drummer.totalPoints}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

}

export default TagLeaderboard;