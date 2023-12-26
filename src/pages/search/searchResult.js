import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from '../../components/card/card';
import './searchResult.css';

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}&page=1`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    fetchData();
  }, [query]);
  

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="search-results__cards">
        {searchResults.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
