import React from "react";

function HomePage() {
	const [tags,setTags] = React.useState([]);
	const [drummers,setDrummers] = React.useState([]);

	React.useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/tags")
		.then((r) => r.json())
		.then((tags) => setTags(tags));
		console.log(tags)
	}, []);

	React.useEffect(() => {
		fetch("https://drumlinetagbackend.onrender.com/drummers")
		.then((r) => r.json())
		.then((drummers) => setDrummers(drummers));
		console.log(drummers)
	}, []);

	function deleteAllTags() {
		tags.forEach((tag) => {
			fetch("https://drumlinetagbackend.onrender.com/tags/" + tag._id + "/remove", {
				method: "DELETE",
			});
		});
	}

	function resetAllDrummersToZero() {
		drummers.forEach((drummer) => {
			fetch("https://drumlinetagbackend.onrender.com/drummers/" + drummer._id + "/reset", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				}
			});
		});
	}

	return (
	<div>
	  <h1>Home Page</h1>
	  <button onClick={deleteAllTags}>Delete All Tags</button>
	  <button onClick={resetAllDrummersToZero}>Reset All Drummers to Zero</button>
	</div>
  );
}

export default HomePage;