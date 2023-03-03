import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Feed() {
	const [tagFeed, setTagFeed] = React.useState([]);
	const [drummers, setDrummers] = React.useState([]);

	const navigate = useNavigate();

	function timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	  }


	React.useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/tags")
			.then((r) => r.json())
			.then((tags) => {
				setTagFeed(tags);
			});	
	}, []);

	React.useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/drummers")
			.then((r) => r.json())
			.then((drummers) => {
				setDrummers(drummers);
			});
		}, []);

	function findDrummer(id) {
		let name = "";
		drummers.forEach((drummer) => {
			if (drummer._id === id) {
				name = drummer.name;
			}
		});
		return name;
	}

	return (
		<div>
			<h1>Feed</h1>
			<button onClick={() => navigate("/addTag")}>Add Tag</button>
			{tagFeed.map((tag) => (
				<div key={tag._id}>
						<b>{findDrummer(tag.tagger)}</b>
					<span> tagged </span>
						<b>{findDrummer(tag.tagged)}</b>
					<span> on </span>
					<span>{timeConverter(tag.date)}</span>
				</div>
			))}
		</div>
	);
}

export default Feed;