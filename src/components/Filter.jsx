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
  // const [freeSearch, setSearch] = useState("");
  // const [searchedActor, setActor] = useState("");
  // const [searchedDirector, setDirector] = useState("");
  // const [searchedGenre, setGenre] = useState("");
  // const [searchedRating, setRating] = useState("");
  // const [searchedLanguage, setLanguage] = useState("");
  // const [searchedDate, setDate] = useState("");
  // const [minRun, setMinRun] = useState();
  // const [maxRun, setMaxRun] = useState();
  // const [minPrice, setMinPrice] = useState();
  // const [maxPrice, setMaxPrice] = useState();
  const [reset, setReset] = useState(false);
  // const [expanded, setExpanded] = useState(false);

  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [genresArray, setGenresArray] = useState([]);
  const [ratingArray, setRatingArray] = useState([]);
  const [languageArray, setLanguageArray] = useState([]);

  // useEffect(() => {
  //   setSearch(query.search || "");
  //   setActor(query.actor || "");
  //   setDirector(query.director || "");
  //   setGenre(query.genre || "");
  //   setRating(query.rated || "");
  //   setLanguage(query.language || "");
  //   if (query.date) {
  //     setDate(
  //       query.date.toLocaleString("sv-SE", {
  //         timeZone: "Europe/Stockholm",
  //         dateStyle: "short",
  //       })
  //     );
  //   } else {
  //     setDate("");
  //   }
  //   setMinRun(query.minRun || "");
  //   setMaxRun(query.maxRun || "");
  //   setMinPrice(query.minPrice || "");
  //   setMaxPrice(query.maxPrice || "");
  //   setExpanded(query.filter);
  // }, []);

  // useEffect(() => {
  //   const q = {
  //     search: freeSearch || undefined,
  //     actor: searchedActor || undefined,
  //     director: searchedDirector || undefined,
  //     genre: searchedGenre || undefined,
  //     rated: searchedRating || undefined,
  //     language: searchedLanguage || undefined,
  //     minRun: minRun || undefined,
  //     maxRun: maxRun || undefined,
  //     minPrice: minPrice || undefined,
  //     maxPrice: maxPrice || undefined,
  //     filter: expanded || undefined,
  //   };
  //   if (searchedDate) {
  //     console.log(searchedDate);
  //     q.date = new Date(searchedDate);
  //   }
  //   setQuery(q, "push");
  // }, [
  //   freeSearch,
  //   searchedActor,
  //   searchedDirector,
  //   searchedGenre,
  //   searchedRating,
  //   searchedLanguage,
  //   searchedDate,
  //   minRun,
  //   maxRun,
  //   minPrice,
  //   maxPrice,
  // ]);

  useEffect(() => {
    console.log(query);
    if (Object.keys(query).length !== 0) {
      // setExpanded(true);
    }
  }, [query]);

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
  }, [
    // freeSearch,
    // searchedActor,
    // searchedDirector,
    // searchedGenre,
    // searchedRating,
    // searchedLanguage,
    // searchedDate,
    // minRun,
    // maxRun,
    // minPrice,
    // maxPrice,
    // setMovies,
    query,
  ]);

  const resetForm = (e) => {
    e.preventDefault();
    // setSearch("");
    // setActor("");
    // setDirector("");
    // setGenre("");
    // setRating("");
    // setLanguage("");
    // setDate("");
    // setReset(true);
    setQuery({
      search: undefined,
      actor: undefined,
      director: undefined,
      genre: undefined,
      rated: undefined,
      language: undefined,
      date: undefined,
      minRun: undefined,
      maxRun: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      filter: undefined,
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
                  setQuery({ date: e.target.value || undefined });
                }}
                value={query.date || ""}
              />
            </div>
            {/* {minValue && maxValue && (
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
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  setMinValue={setMinValue}
                  setMaxValue={setMaxValue}
                  name="price"
                />
              </div>
            )} */}
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
