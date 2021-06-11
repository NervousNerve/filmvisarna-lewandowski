import { useState, useEffect } from "react";

const Filter = () => {
  const [freeSearch, setSearch] = useState("");
  const [searchedActor, setActor] = useState("");
  const [searchedDirector, setDirector] = useState("");
  const [searchedGenre, setGenre] = useState("");
  const [searchedRating, setRating] = useState("");
  const [searchedLanguage, setLanguage] = useState("");
  const [searchedDate, setDate] = useState("");

  const [genresArray, setGenresArray] = useState(["Drama", "Comedy", "Sci-Fi"]);
  const [ratingArray, setRatingArray] = useState(["PG", "PG-13", "R"]);
  const [languageArray, setLanguageArray] = useState([
    "English",
    "Swedish",
    "Russian",
  ]);

  // useEffect(() => {
  //   console.log(searchedDate);
  // }, [searchedDate]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleActor = (e) => {
    setActor(e.target.value);
  };

  const handleDirector = (e) => {
    setDirector(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setSearch("");
    setActor("");
    setDirector("");
    setGenre("");
    setRating("");
    setLanguage("");
    setDate(new Date());
  };

  return (
    <div>
      <h3>Filter</h3>
      <form>
        <label>Search</label>
        <input
          type="text"
          placeholder="Free search"
          onChange={handleSearch}
          className="input"
          value={freeSearch}
        />
        <label>Actor</label>
        <input
          type="text"
          placeholder="Actor"
          onChange={handleActor}
          className="input"
          value={searchedActor}
        />
        <label>Director</label>
        <input
          type="text"
          placeholder="Director"
          onChange={handleDirector}
          className="input"
          value={searchedDirector}
        />
        <label>Genres</label>
        <select
          className="custom-select"
          onChange={handleGenre}
          value={searchedGenre}
        >
          {genresArray.map((genre, i) => {
            return (
              <option key={i} value={genre.toLocaleLowerCase()}>
                {genre}
              </option>
            );
          })}
        </select>
        <label>Age rating</label>
        <select
          className="custom-select"
          onChange={handleRating}
          value={searchedRating}
        >
          {ratingArray.map((rating, i) => {
            return (
              <option key={i} value={rating.toLocaleLowerCase()}>
                {rating}
              </option>
            );
          })}
        </select>
        <label>Language</label>
        <select
          className="custom-select"
          onChange={handleLanguage}
          value={searchedLanguage}
        >
          {languageArray.map((language, i) => {
            return (
              <option key={i} value={language.toLocaleLowerCase()}>
                {language}
              </option>
            );
          })}
        </select>
        <label>Date</label>
        <input
          type="date"
          className="input"
          onChange={handleDate}
          value={searchedDate}
        />
        <label>Price</label>
        <input type="range" />
        <label>Runtime</label>
        <input type="range" />
        <button className="button" onClick={resetForm}>
          Reset filter
        </button>
      </form>
    </div>
  );
};

export default Filter;
