import { useState } from "react";

const SearchForm = ({ setSearchTerm }) => {
    const [newSearchTerm, setNewSearchTerm] = useState("")
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(newSearchTerm);
        setNewSearchTerm("");
    }
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>Search for Art:</label>
            <input type="text" value={newSearchTerm}
            onChange={(event) => {
                setNewSearchTerm(event.target.value)
            }} ></input>
            <button className="App-button">Search</button>

        </form>
    )
}

export default SearchForm;