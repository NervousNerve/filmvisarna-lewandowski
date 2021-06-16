import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Filter.module.css";

import MultiRangeSlider from "./MultiRangeSlider";

import {
  BooleanParam,
  DateParam,
  NumberParam,
  StringParam,
  useQueryParams,
} from "use-query-params";

const Filter = ({ setMovies }) => {
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    actor: StringParam,
    director: StringParam,
    genre: StringParam,
    rated: StringParam,
    language: StringParam,
    date: DateParam,
    minRun: NumberParam,
    maxRun: NumberParam,
    minPrice: NumberParam,
    maxPrice: NumberParam,
    filter: BooleanParam,
  });

  const [reset, setReset] = useState(false);

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
      setMinValue(Math.min(...arrays.minPrice));
      setMaxValue(Math.max(...arrays.maxPrice));
    }
    fetchValues();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/v1/movies/?search=${query.search || ""}&actors=${
          query.actor || ""
        }&genre=${query.genre || ""}&language=${
          query.language || ""
        }&director=${query.director || ""}&minRuntime=${
          query.minRun || ""
        }&maxRuntime=${query.maxRun || ""}&rated=${
          query.rated || ""
        }&minPrice=${query.minPrice || ""}&maxPrice=${
          query.maxPrice || ""
        }&date=${query.date || ""}`
      );
      setMovies(await response.json());
    }
    fetchData();
  }, [query]);

  const resetForm = (e) => {
    e.preventDefault();

    setReset(true);
    setQuery({
      search: undefined,
      actor: undefined,
      director: undefined,
      genre: undefined,
      rated: undefined,
      language: undefined,
      date: undefined,
    });
  };

  const toggleExpand = () => {
    setQuery({ filter: !query.filter });
  };

  return (
    <div className={styles.filterContainer}>
      <div
        className={`${styles.expandBtn} ${
          query.filter && styles.filterExpanded
        }`}
      >
        <button onClick={toggleExpand}>
          Filter
          {query.filter ? (
            <FontAwesomeIcon icon={faTimes} className={styles.icon} />
          ) : (
            <FontAwesomeIcon icon={faFilter} className={styles.icon} />
          )}
        </button>
      </div>
      {query.filter && <hr></hr>}

      {query.filter && (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Free search"
            onChange={(e) => {
              setQuery({
                search: e.target.value || undefined,
              });
            }}
            className={`${styles.searchInput} input`}
            value={query.search || ""}
          />
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Actor</label>
              <input
                type="text"
                placeholder="Actor"
                onChange={(e) => {
                  setQuery({ actor: e.target.value || undefined });
                }}
                className={`${styles.input} input`}
                value={query.actor || ""}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.filterLabel}>Director</label>
              <input
                type="text"
                placeholder="Director"
                onChange={(e) => {
                  setQuery({ director: e.target.value || undefined });
                }}
                className={`${styles.input} input`}
                value={query.director || ""}
              />
            </div>
            <div className={`${styles.inputContainer}`}>
              <label className={styles.filterLabel}>Genres</label>
              <div className="custom-select">
                <select
                  className={`${styles.input}`}
                  onChange={(e) => {
                    setQuery({ genre: e.target.value || undefined });
                  }}
                  value={query.genre || ""}
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
                    setQuery({ rated: e.target.value || undefined });
                  }}
                  value={query.rated || ""}
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
                    setQuery({ language: e.target.value || undefined });
                  }}
                  value={query.language || ""}
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
                  // setQuery({ date: e.target.value || undefined });
                  setQuery({ date: new Date(e.target.value) || undefined });
                }}
                value={query.date || ""}
              />
            </div>
            {minValue && maxValue && (
              <div
                className={`${styles.inputContainer} ${styles.multiRangeSlider}`}
              >
                <label
                  className={`${styles.multiRangeSliderLabel} ${styles.filterLabel}`}
                >
                  Runtime (min)
                </label>
                <MultiRangeSlider
                  min={minValue}
                  max={maxValue}
                  name="runtime"
                  reset={reset}
                  setReset={setReset}
                  setQuery={setQuery}
                  minValue={query.minRun}
                  maxValue={query.maxRun}
                />
              </div>
            )}{" "}
            {minValue && maxValue && (
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
                  minValue={query.minPrice}
                  maxValue={query.maxPrice}
                  setQuery={setQuery}
                  name="price"
                />
              </div>
            )}
            <button
              type="button"
              className={`${styles.button} button`}
              onClick={resetForm}
            >
              Clear filter
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Filter;
