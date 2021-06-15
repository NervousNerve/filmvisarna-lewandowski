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

  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
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
      console.log(arrays);
      setMinValue(Math.min(...arrays.minPrice));
      setMaxValue(Math.max(...arrays.maxPrice));
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
    setMovies,
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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.filterContainer}>
      <div
        className={`${styles.expandBtn} ${expanded && styles.filterExpanded}`}
      >
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
            }}
            className={`${styles.searchInput} input`}
            value={freeSearch}
          />
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Actor</label>
              <input
                type="text"
                placeholder="Actor"
                onChange={(e) => {
                  setActor(e.target.value);
                }}
                className={`${styles.input} input`}
                value={searchedActor}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Director</label>
              <input
                type="text"
                placeholder="Director"
                onChange={(e) => {
                  setDirector(e.target.value);
                }}
                className={`${styles.input} input`}
                value={searchedDirector}
              />
            </div>
            <div className={`${styles.inputContainer}`}>
              <label className={styles.filterLabel}>Genres</label>
              <div className="custom-select">
                <select
                  className={`${styles.input}`}
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  value={searchedGenre}
                >
                  <option value="">Not chosen</option>
                  {genresArray.map((genre, i) => {
                    return (
                      <option key={i} value={genre.toLocaleLowerCase()}>
                        {genre}
                      </option>
                    );
                  })}
                </select>
                <span className="focus"></span>
              </div>
            </div>

            <div className={`${styles.inputContainer}`}>
              <label className={styles.filterLabel}>Age rating</label>
              <div className="custom-select">
                <select
                  className={`${styles.input}`}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  value={searchedRating}
                >
                  <option value="">Not chosen</option>
                  {ratingArray.map((rating, i) => {
                    return (
                      <option key={i} value={rating.toLocaleLowerCase()}>
                        {rating}
                      </option>
                    );
                  })}
                </select>
                <span className="focus"></span>
              </div>
            </div>

            <div className={`${styles.inputContainer}`}>
              <label className={styles.filterLabel}>Language</label>
              <div className="custom-select">
                <select
                  className={`${styles.input}`}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  value={searchedLanguage}
                >
                  <option value="">Not chosen</option>
                  {languageArray.map((language, i) => {
                    return (
                      <option key={i} value={language.toLocaleLowerCase()}>
                        {language}
                      </option>
                    );
                  })}
                </select>
                <span className="focus"></span>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Date</label>
              <input
                type="date"
                className={`${styles.input} ${styles.date} input`}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={searchedDate}
              />
            </div>

            <div
              className={`${styles.inputContainer} ${styles.multiRangeSlider}`}
            >
              <label
                className={`${styles.multiRangeSliderLabel} ${styles.filterLabel}`}
              >
                Runtime (min)
              </label>
              <MultiRangeSlider
                className={styles.rangeSlider}
                min={minValue}
                max={maxValue}
                name="runtime"
                setMinRun={setMinRun}
                setMaxRun={setMaxRun}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
                reset={reset}
                setReset={setReset}
              />
            </div>
            <div
              className={`${styles.inputContainer} ${styles.multiRangeSlider}`}
            >
              <label
                className={`${styles.multiRangeSliderLabel} ${styles.filterLabel}`}
              >
                Price (SEK)
              </label>
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
