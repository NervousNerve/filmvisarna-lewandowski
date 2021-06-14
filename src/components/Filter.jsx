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
  const [minRun, setMinRun] = useState();
  const [maxRun, setMaxRun] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [reset, setReset] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200);
  const [genresArray, setGenresArray] = useState([]);
  const [ratingArray, setRatingArray] = useState([]);
  const [languageArray, setLanguageArray] = useState([]);

  useEffect(() => {
    async function fetchValues() {
      const response = await fetch("/api/v1/movies/values");
      let arrays = await response.json();
      setGenresArray(arrays.genre);
      setRatingArray(arrays.rated);
      setLanguageArray(arrays.language);
    }
    fetchValues();
  }, []);

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
    setReset(true);
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
            onChange={(e) => {
              setSearch(e.target.value);
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
            type="text"
            placeholder="Actor"
            onChange={(e) => {
              setActor(e.target.value);
            }}
            className="input"
            value={searchedActor}
          />
          <label>Director</label>
          <input
            type="text"
            placeholder="Director"
            onChange={(e) => {
              setDirector(e.target.value);
            }}
            className="input"
            value={searchedDirector}
          />
          <label>Genres</label>
          <select
            className="custom-select"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
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
            onChange={(e) => {
              setRating(e.target.value);
            }}
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
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
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
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={searchedDate}
          />
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
