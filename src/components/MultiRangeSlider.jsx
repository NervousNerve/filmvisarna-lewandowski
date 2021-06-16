import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../css/MultiRangeSlider.module.css";

const MultiRangeSlider = ({
  min,
  max,
  name,
  reset,
  setReset,
  setQuery,
  minValue,
  maxValue,
}) => {
  const [minVal, setMinVal] = useState(minValue ? minValue : min);
  const [maxVal, setMaxVal] = useState(maxValue ? maxValue : max);
  const minValRef = useRef(minValue ? minValue : min);
  const maxValRef = useRef(maxValue ? maxValue : max);

  const range = useRef(null);

  useEffect(() => {
    if (reset) {
      setMaxVal(max);
      setMinVal(min);
      minValRef.current = min;
      maxValRef.current = max;
      setReset(false);
    }
  }, [reset, setReset, min, max]);

  useEffect(() => {
    if (name === "runtime") {
      setQuery({ minRun: minVal, maxRun: maxVal });
    } else if (name === "price") {
      setQuery({ minPrice: minVal, maxPrice: maxVal });
    }
  }, [minVal, maxVal, name, setQuery]);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumbLeft}`}
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumbRight}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div ref={range} className={styles.slider__range} />
        <div className={styles.slider__leftValue}>{minVal}</div>
        <div className={styles.slider__rightValue}>{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
