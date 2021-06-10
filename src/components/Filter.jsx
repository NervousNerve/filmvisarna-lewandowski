import { useState } from "react";

const Filter = () => {
  const [chosenScreeningId, setchosenScreeningId] = useState();

  const handleChange = (e) => {
    setchosenScreeningId(e.target.value);
  };

  return (
    <div>
      <h3>Filter</h3>
      <form>
        <input type="text" placeholder="search" onChange={handleChange} />
        <label>Actor</label>
        <input type="text" className="input" />
        <label>Director</label>
        <input type="text" className="input" />
        <label>Genres</label>
        <select className="custom-select">
          <option selected value="drama">
            Drama
          </option>
          <option value="comedy">Comedy</option>
          <option value="action">Action</option>
        </select>
        <label>Age rating</label>
        <select className="custom-select">
          <option selected value="pg13">
            PG-13
          </option>
          <option value="pg">PG</option>
          <option value="r">R</option>
        </select>
        <label>Language</label>
        <select className="custom-select">
          <option selected value="english">
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
