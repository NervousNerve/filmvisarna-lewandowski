import { useState, useEffect } from "react";

const Filter = () => {
  const [freeSearch, setSearch] = useState();
  const [searchedActor, setActor] = useState();
  const [searchedDirector, setDirector] = useState();

  // useEffect(() => {
  //   console.log(searchedActor);
  // }, [searchedActor]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleActor = (e) => {
    setActor(e.target.value);
  };

  const handleDirector = (e) => {
    setDirector(e.target.value);
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
        />
        <label>Actor</label>
        <input
          type="text"
          placeholder="Actor"
          onChange={handleActor}
          className="input"
        />
        <label>Director</label>
        <input
          type="text"
          placeholder="Director"
          onChange={handleDirector}
          className="input"
        />
        <label>Genres</label>
        <select className="custom-select">
          <option defaultValue value="drama">
            Drama
          </option>
          <option value="comedy">Comedy</option>
          <option value="action">Action</option>
        </select>
        <label>Age rating</label>
        <select className="custom-select">
          <option defaultValue value="pg13">
            PG-13
          </option>
          <option value="pg">PG</option>
          <option value="r">R</option>
        </select>
        <label>Language</label>
        <select className="custom-select">
          <option defaultValue value="english">
            English
          </option>
          <option value="english">Swedish</option>
        </select>
        <label>Date</label>
        <input type="date" className="input" />
        <label>Price</label>
        <input type="range" />
        <label>Runtime</label>
        <input type="range" />
        <button className="button">Reset filter</button>
      </form>
    </div>
  );
};

export default Filter;
