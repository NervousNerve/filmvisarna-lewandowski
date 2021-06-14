import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
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
  const [searchedRuntime, setRuntime] = useState("");

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
        `/api/v1/movies/?search=${freeSearch}&actors=${searchedActor}&genre=${searchedGenre}&language=${searchedLanguage}&director=${searchedDirector}&minRuntime=${searchedRuntime}&rated=${searchedRating}&minPrice=${searchedPrice}&date=${searchedDate}`
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
    searchedRuntime,
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

  const handlePrice = (e) => {
    setPrice(parseInt(e.target.value));
  };

  const handleRuntime = (e) => {
    setRuntime(parseInt(e.target.value));
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
    setRuntime("");
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.expandBtn}>
        <button onClick={toggleExpand}>
          Filter
          {expanded ? (
            <FontAwesomeIcon icon={faTimes} className={styles.icon} />
          ) : (
            <FontAwesomeIcon icon={faFilter} className={styles.icon} />
          )}
        </button>
      </div>
      {expanded && <hr></hr>}

      {expanded && (
        <form>
          <input
            type="text"
            placeholder="Free search"
            onChange={handleSearch}
            className={`${styles.searchInput} input`}
            value={freeSearch}
          />
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Actor</label>
              <input
                type="text"
                placeholder="Actor"
                onChange={handleActor}
                className={`${styles.input} input`}
                value={searchedActor}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Director</label>
              <input
                type="text"
                placeholder="Director"
                onChange={handleDirector}
                className={`${styles.input} input`}
                value={searchedDirector}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Genres</label>
              <select
                className={`${styles.input} custom-select`}
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
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Age rating</label>
              <select
                className={`${styles.input} custom-select`}
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
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Language</label>
              <select
                className={`${styles.input} custom-select`}
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
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Date</label>
              <input
                type="date"
                className={`${styles.input} input`}
                onChange={handleDate}
                value={searchedDate}
              />
            </div>
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
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Price</label>
              <MultiRangeSlider min={0} max={1000} />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Runtime</label>
              <MultiRangeSlider min={0} max={1000} />
            </div>
            <button className={`${styles.button} button`} onClick={resetForm}>
              Clear filter
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Filter;
