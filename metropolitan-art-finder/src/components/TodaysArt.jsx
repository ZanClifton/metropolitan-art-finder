import { useEffect, useState } from "react";
import TodaysArtData from "../data/TodaysArtData";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// export default function MediaCard() {

// }

const TodaysArt = () => {
  const [todaysArt, setTodaysArt] = useState([]);
  console.log(todaysArt);

  const today = new Date();
  const index = String(today.getDate()).padStart(2, "0");

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${TodaysArtData[index]}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setTodaysArt(data);
      });
  }, [TodaysArtData[index]]);

  const {
    artistWikidata_URL,
    artistDisplayName,
    title,
    medium,
    primaryImageSmall,
  } = todaysArt;

  return (
    <section>
      <h2>Artwork of the Day</h2>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={primaryImageSmall}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {medium}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={artistWikidata_URL}>{artistDisplayName}</Button>
        </CardActions>
      </Card>
    </section>
  );
};

export default TodaysArt;
