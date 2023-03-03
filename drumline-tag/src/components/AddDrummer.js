import React from "react";
import { useNavigate } from "react-router-dom";

function AddDrummer() {
	const navigate = useNavigate();
	const [name, setName] = React.useState("");
	const [section, setSection] = React.useState("");
	const [year, setYear] = React.useState("");

	function handleSubmit(e) {
		e.preventDefault();
		fetch("https://drumlinetagbackend.onrender.com/drummers/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				section: section,
				year: year,
			}),
		}).then((r) => {
			if (r.ok) {
				r.json().then((drummer) => {
					console.log(drummer);
				});
			}
		});
		// when the form is submitted, navigate to the drummers page
		navigate("/drummers");
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Add Drummer</h1>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="section">Section</label>
			<input
				type="text"
				id="section"
				value={section}
				onChange={(e) => setSection(e.target.value)}
			/>
			<label htmlFor="year">Year</label>
			<input
				type="text"
				id="year"
				value={year}
				onChange={(e) => setYear(e.target.value)}
			/>
			<button type="submit">Add Drummer</button>
		</form>
	);
}

export default AddDrummer;