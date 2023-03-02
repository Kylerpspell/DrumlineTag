import React from "react";
import { NavLink } from "react-router-dom";


function Feed() {
	const tagFeed = [
		{
			tagger: "John Doe",
			tagged: "Jane Doe",
			date: "2021-01-01 12:00:00",
			picture: "https://picsum.photos/200/300",
			comments: [
				{
					commenter: "Jane Doe",
					comment: "This is a comment",
					date: "2021-01-01 12:00:00",
				},
				{
					commenter: "John Doe",
					comment: "This is another comment",
					date: "2021-01-01 12:00:00",
				},
			],
		},
		{
			tagger: "Jane Doe",
			tagged: "John Doe",
			date: "2021-01-01 12:00:00",
			picture: "https://picsum.photos/200/321",
			comments: [
				{
					commenter: "John Doe",
					comment: "This is a comment",
					date: "2021-01-01 12:00:00",
				},
				{
					commenter: "Jane Doe",
					comment: "This is another comment",
					date: "2021-01-01 12:00:00",
				},
			],
		}
	];

	const tagFeedList = tagFeed.map((tag) => {
		return (
			<div className="tagFeedItem">
				<div className="tagger">
					{tag.tagger} tagged {tag.tagged}
				</div>
				<div className="date">
					{tag.date}
				</div>
				<div className="picture">
					<img src={tag.picture} alt="tagged picture" />
				</div>
				<div className="comments">
					{tag.comments.map((comment) => {
						return (
							<div className="comment">
								<div className="commenter">
									{comment.commenter}
								</div>
								<div>
									{comment.comment}
								</div>
								<div className="date">
									{comment.date}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	});

	return (
	<div>
	  <h1>Feed</h1>
	  <div className="center">
	  {tagFeedList}
	  </div>
	</div>
  );
}

export default Feed;