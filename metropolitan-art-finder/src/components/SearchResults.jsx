import { useEffect, useState } from "react";

const SearchResults = ({ searchTerm }) => {
	const [art, setArt] = useState([]);

	useEffect(() => {
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`)
			.then((response) => response.json())
			.then(({ objectIDs }) => {
				const arts = objectIDs.splice(0, 50);
				return Promise.all(
					arts.map((ID) => {
						return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`);
					})
				);
			})
			.then((results) => {
				const artPromises = results.map((result) => {
					return result.json();
				});
				return Promise.all(artPromises);
			})
			.then((data) => {
				setArt(data);
				console.log(data.map(datum => {
					return datum.objectID
				}))
			});
	}, [searchTerm]);

	return (
		<div>
			<h2>Beautiful Art</h2>
			<ul>
				{art.map(({ artistWikidata_URL, artistDisplayName, title, medium, primaryImageSmall, objectID }) => {
					return (
						<li>
							<img src={primaryImageSmall} alt={title} />
							<p>{artistWikidata_URL}</p>
							<p>{artistDisplayName}</p>
							<p>{title}</p>
							<p>{medium}</p>
							<p>{objectID}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};


export default SearchResults;