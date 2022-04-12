import { useEffect, useState } from "react";
import TodaysArtData from "../data/TodaysArtData";

const TodaysArt = () => {
    const [todaysArt, setTodaysArt] = useState([]);
    console.log(todaysArt)

    const today = new Date();
    const index = String(today.getDate()).padStart(2, '0');
  
  useEffect(() => {
      fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${TodaysArtData[index]}`)
          .then((result) => {
              return result.json()
            })
            .then((data) => {
                setTodaysArt(data);
            });
        }, [TodaysArtData[index]]);
        
        const { artistWikidata_URL, artistDisplayName, title, medium, primaryImageSmall } = todaysArt;
    return (
        <section>
            <h2>Artwork of the Day</h2>
            <img src={primaryImageSmall} alt={title} />
			<p>{artistWikidata_URL}</p>
			<p>{artistDisplayName}</p>
			<p>{title}</p>
			<p>{medium}</p>
         </section>
    )  
};

export default TodaysArt;
