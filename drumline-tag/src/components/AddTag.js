import React from "react";
import { useNavigate } from "react-router-dom";

function AddTag() {
    const navigate = useNavigate();
    const [tagger, setTagger] = React.useState("");
    const [tagged, setTagged] = React.useState("");
    const [drummers, setDrummers] = React.useState([]);

    React.useEffect(() => {
        fetch("https://drumlinetagbackend.onrender.com/drummers")
            .then((r) => r.json())
            .then((drummers) => {
                setDrummers(drummers);
            });
    }, []);


    function handleSubmit(e) {
        e.preventDefault();
        let date = Date.now();
        if (!tagger && !tagged) {
            alert("Please select a tagger and tagged drummer");
        } else if (!tagger) {
            alert("Please select a tagger");
        } else if (!tagged) {
            alert("Please select a tagged drummer");
        } else {
            if (tagger === tagged) {
                alert("You cannot tag yourself");
            }
            else {
                fetch("https://drumlinetagbackend.onrender.com/tags/add/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tagger,
                        tagged,
                        date
                    }),
                })
                    .then((r) => r.json())
                    .then((tag) => {
                        fetch("https://drumlinetagbackend.onrender.com/drummers/" + tagger.toString() + "/addtag", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            }
                        })
                        fetch("https://drumlinetagbackend.onrender.com/drummers/" + tagged.toString() + "/addtagged", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            }
                        })
                        navigate("/feed");
                    });
            }
        }
    }


    return (
        <div>
            <h1>Add Tag</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tagger">Tagger</label>
                <select
                    id="tagger"
                    value={tagger}
                    onChange={(e) => setTagger(e.target.value)}
                >
                    <option value="">Select a drummer</option>
                    {drummers.map((drummer) => (
                        <option key={drummer._id} value={drummer._id}>
                            {drummer.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="tagged">Tagged</label>
                <select
                    id="tagged"
                    value={tagged}
                    onChange={(e) => setTagged(e.target.value)}
                >
                    <option value="">Select a drummer</option>
                    {drummers.map((drummer) => (
                        <option key={drummer._id} value={drummer._id}>
                            {drummer.name}
                        </option>
                    ))}
                </select>
                <button type="submit" onClick={handleSubmit}>Add Tag</button>
            </form>
        </div>
    );
}

export default AddTag;