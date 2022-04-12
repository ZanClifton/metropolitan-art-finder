import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
							<Card sx={{ maxWidth: 345 }}>
								<CardMedia component="img" height="300" image={primaryImageSmall} alt={title} />
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{medium}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small" href={artistWikidata_URL}>
										{artistDisplayName}
									</Button>
								</CardActions>
							</Card>
						</li>
					);
				})}
			</ul>
		</div>
	);
};


export default SearchResults;