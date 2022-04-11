import { useEffect, useState } from "react";

const SearchResults = ({ searchTerm }) => {
    const [art, setArt] = useState([]);
    console.log(searchTerm)

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`)
          .then((response) => response.json())
          .then(({ objectIDs }) => {
              objectIDs[0].map((ID) => {
                return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`)
            })
            .then((response) => response.json())
            .then((results) => {
                    
                  console.log(results)
              })
            })

    })
  return (
      <div>
          <h2>Beautiful Art</h2>
          <ul>
              <li>Art</li>
              <li>Art</li>
              <li>Art</li>
          </ul>
      </div>
  )
}


export default SearchResults;