import "./App.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
import SearchForm from "./components/SearchForm.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm)
  return (
    <div className="App">
      <Header />
      <SearchForm setSearchTerm={setSearchTerm} />
      <SearchResults searchTerm={searchTerm}/>
    </div>
  );
}

export default App;
