import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Filter.module.css";

import MultiRangeSlider from "./MultiRangeSlider";

const Filter = ({ setMovies }) => {
  const [freeSearch, setSearch] = useState("");
  const [searchedActor, setActor] = useState("");
  const [searchedDirector, setDirector] = useState("");
  const [searchedGenre, setGenre] = useState("");
  const [searchedRating, setRating] = useState("");
  const [searchedLanguage, setLanguage] = useState("");
  const [searchedDate, setDate] = useState("");
  const [searchedPrice, setPrice] = useState("");
  const [minRun, setMinRun] = useState();
  const [maxRun, setMaxRun] = useState();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [reset, setReset] = useState(false);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200);

  const [genresArray, setGenresArray] = useState(["Drama", "Comedy", "Sci-Fi"]);
  const [ratingArray, setRatingArray] = useState(["PG", "PG-13", "R"]);
  const [languageArray, setLanguageArray] = useState([
    "English",
    "Swedish",
    "Russian",
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/v1/movies/?search=${freeSearch}&actors=${searchedActor}&genre=${searchedGenre}&language=${searchedLanguage}&director=${searchedDirector}&minRuntime=${minRun}&maxRuntime=${maxRun}&rated=${searchedRating}&minPrice=${minPrice}&maxPrice=${maxPrice}&date=${searchedDate}`
      );
      setMovies(await response.json());
    }
    fetchData();
  }, [
    freeSearch,
    searchedActor,
    searchedDirector,
    searchedGenre,
    searchedRating,
    searchedLanguage,
    searchedDate,
    searchedPrice,
    minRun,
    maxRun,
    minPrice,
    maxPrice,
  ]);

  const [expanded, setExpanded] = useState(false);

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
    setDate("");
    setPrice("");
    setMinValue(0);
    setMaxValue(200);
    setReset(true);
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className={styles.expandBtn}>
        <button onClick={toggleExpand}>Filter</button>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      {expanded && (
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
          {/* <label>Price</label>
          <input
            type="range"
            onChange={handlePrice}
            value={searchedPrice}
            min="0"
            max="200"
          />
          <label>Runtime</label>
          <input
            type="range"
            onChange={handleRuntime}
            value={searchedRuntime}
            min="0"
            max="200"
          /> */}
          <label>Runtime</label>
          <MultiRangeSlider
            min={minValue} // 0
            max={maxValue} //200
            name="runtime"
            setMinRun={setMinRun}
            setMaxRun={setMaxRun}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            reset={reset}
            setReset={setReset}
          />
          <label>Price</label>
          <MultiRangeSlider
            setReset={setReset}
            reset={reset}
            min={minValue}
            max={maxValue}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            name="price"
          />
          <button className="button" onClick={resetForm}>
            Reset filter
          </button>
        </form>
      )}
    </div>
  );
};

export default Filter;
