import React from 'react';
import { useState, useEffect } from 'react';
function TagLeaderboard () {
	const [tags, setTags] = useState([]);
	const [drummers, setDrummers] = useState([]);
	const [tagLeaderboard, setTagLeaderboard] = useState([]);
	const [mostWanted, setMostWanted] = useState({});
	
	const mostWantedPoster = () => {
		// if mostWanted is not empty, return mostWantedPoster
		let hasImage = false;
		let mostWantedImage = '';
		tags.forEach((tag) => {
			if (tag.tagger === mostWanted._id) {
				hasImage = true;
				mostWantedImage = tag.img_url;
			}
		});
		
		if (hasImage) {
			return (
				<div className='mostWantedPoster'>
					<h2>Most Wanted</h2>
					<img src={mostWantedImage} alt={mostWanted.name}/>
					<h3>{mostWanted.name}</h3>
				</div>
			);
		} else {
			return (
				<div className='mostWantedPoster'>
					<h2>Most Wanted</h2>
					<h3>{mostWanted.name}</h3>
				</div>
			);
		}
	};

	useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/tags")
			.then((r) => r.json())
			.then((tags) => setTags(tags));

		fetch("https://drumlinetagbackend.onrender.com/drummers")
			.then((r) => r.json())
			.then((drummers) => setDrummers(drummers));
		
		// loop through drummers and find isMostWanted
		drummers.forEach((drummer) => {
			if (drummer.isMostWanted) {
				setMostWanted(drummer);
			}
		});
	}, [mostWantedPoster]);

	useEffect(() => {
		let tagLeaderboard = [];
		drummers.forEach((drummer) => {
			let totalPoints = 0;
			tags.forEach((tag) => {
				if (tag.tagger === drummer._id) {
					if (tag.isOfMostWanted) {
						totalPoints += 5;
					}
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
			{mostWantedPoster()}
		</div>
	);
}

export default TagLeaderboard;