import React from 'react';
import { useState, useEffect } from 'react';
function TagLeaderboard () {
	const [tags, setTags] = useState([]);
	const [drummers, setDrummers] = useState([]);
	const [tagLeaderboard, setTagLeaderboard] = useState([]);
	const [mostWanted, setMostWanted] = useState({});
	const [filters, setFilters] = useState(["snare", "tenor", "bass", "multi", "cymbals"]);
	
	const [sectionLeaderboard, setSectionLeaderboard] = useState([]);
	const [classLeaderboard, setClassLeaderboard] = useState([]);

	const mostWantedPoster = () => {
		// if mostWanted is not empty, return mostWantedPoster
		let hasImage = false;
		let mostWantedImage = '';
		tags.forEach((tag) => {
			if (tag.tagged === mostWanted._id) {
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

	const allMappedToTable = () => {
		const mappedTable = tagLeaderboard.map((drummer) => { 
			if (filters.includes(drummer.section)){
				return (
				<tr key={drummer.name}>
					<td>{drummer.name}</td>
					<td>{drummer.totalPoints}</td>
				</tr>
				)
			}
		});
		return mappedTable;
	}

	useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/tags")
			.then((r) => r.json())
			.then((tags) => setTags(tags))
			.catch((err) => {
				console.log(err.message);
			});

		fetch("https://drumlinetagbackend.onrender.com/drummers")
			.then((r) => r.json())
			.then((drummers) => setDrummers(drummers))
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	useEffect(() => {
		// loop through drummers and find isMostWanted
		drummers.forEach((drummer) => {
			if (drummer.isMostWanted) {
				setMostWanted(drummer);
			}
		});
	}), [drummers]

	useEffect(() => {
		let tagLeaderboard = [];
		drummers.forEach((drummer) => {
			let totalPoints = 0;
			tags.forEach((tag) => {
				if (tag.tagger === drummer._id) {
					if (tag.isOfMostWanted) {
						totalPoints += 5;
					} else { // was this supposed to be like this?
						totalPoints += 3;
					} 
				}
				if (tag.tagged === drummer._id) {
					totalPoints -= 1;
				}
			});
			tagLeaderboard.push({ name: drummer.name, totalPoints: totalPoints, section: drummer.section });
		});
		tagLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
		setTagLeaderboard(tagLeaderboard);

		const years = ["freshman", "sophomore", "junior", "senior"]
		const yearLeaderboard = []
		years.forEach((year) => {
			let totalPoints = 0;
			tags.forEach((tag) => {
				drummers.forEach((drummer) => {
					if ((tag.tagger === drummer._id && drummer.year === year)) {
						if (tag.isOfMostWanted) {
							totalPoints += 5;
						} else { 
							totalPoints += 3; // was this supposed to be like this?
						}
					}
					if ((tag.tagged === drummer._id) && (drummer.year === year)) {
						totalPoints -= 1;
					}
				});
			});
			yearLeaderboard.push({year: year, totalPoints: totalPoints});
		});
		yearLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
		setClassLeaderboard(yearLeaderboard)

		const sections = ["snare", "tenor", "multi", "bass", "cymbals"]
		const sectionLeaderboard = []
		sections.forEach((section) => {
			let totalPoints = 0;
			tags.forEach((tag) => {
				drummers.forEach((drummer) => {
					if ((tag.tagger === drummer._id && drummer.section === section)) {
						if (tag.isOfMostWanted) {
							totalPoints += 5;
						} else {
							totalPoints += 3; // was this supposed to be like this?
						}
					}
					if ((tag.tagged === drummer._id) && (drummer.section === section)) {
						totalPoints -= 1;
					}
				});
			});
			sectionLeaderboard.push({section: section, totalPoints: totalPoints});
		});
		sectionLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
		setSectionLeaderboard(sectionLeaderboard)
	}, [tags, drummers, filters]);

	const deleteByValue = value => {
		setFilters(filters => {
		  return filters.filter(filter => filter !== value)
		})
	  }

	function toggleFilters(filter_id) {
		if (filters.includes(filter_id)) {
			deleteByValue(filter_id)
		} else {	
			setFilters([...filters,filter_id])
		}
	}

	return (
		<div>
			<div className='filterSelect'>
				<button onClick={() => toggleFilters('snare')} className={(filters.includes('snare')) ? 'activeFilter': 'inactiveFilter'}>
					Snare
				</button>
				<button onClick={() => toggleFilters('tenor')} className={(filters.includes('tenor')) ? 'activeFilter': 'inactiveFilter'}>
					Tenor
				</button>
				<button onClick={() => toggleFilters('multi')} className={(filters.includes('multi')) ? 'activeFilter': 'inactiveFilter'}>
					Multi
				</button>
				<button onClick={() => toggleFilters('bass')} className={(filters.includes('bass')) ? 'activeFilter': 'inactiveFilter'}>
					Bass
				</button>
				<button onClick={() => toggleFilters('cymbals')} className={(filters.includes('cymbals')) ? 'activeFilter': 'inactiveFilter'}>
					Cymbals
				</button>
			</div>
			<table className='leaderboardTable'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Total Points</th>
					</tr>
				</thead>
				<tbody>
					{allMappedToTable()}
				</tbody>
			</table>
			
			<div className='subTableSpan'>
				{mostWantedPoster()}
				<div className='subTableWrapper'>
					<table className='subTable'>
						<thead>
							<tr>
								<th>Class</th>
								<th>Total Points</th>
							</tr>
						</thead>
						<tbody>
							{classLeaderboard.map((classYear) => ( 
								<tr key={classYear.year}>
									<td>{classYear.year}</td>
									<td>{classYear.totalPoints}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='subTableWrapper'>
					<table className='subTable'>
						<thead>
							<tr>
								<th>Section</th>
								<th>Total Points</th>
							</tr>
						</thead>
						<tbody>
							{sectionLeaderboard.map((section) => ( 
								<tr key={section.section}>
									<td>{section.section}</td>
									<td>{section.totalPoints}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
	);
}

export default TagLeaderboard;