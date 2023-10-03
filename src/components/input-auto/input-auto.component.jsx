import React, { useState } from "react";

import "./input-auto.styles.scss";

export default function InputAuto({
  placeholder,
  data = [],
  onSelected = () => {},
  onChange = () => {},
  defaultVal = "",
}) {
  const [suggestions, setSugesstions] = useState([]);
  const [isHideSuggs, setIsHideSuggs] = useState(true);
  const [selectedVal, setSelectedVal] = useState(defaultVal);

  const handler = (e) => {
    setSugesstions(data.filter((i) => i.startsWith(e.target.value)));
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    onChange(input);
  };

  const hideSuggs = (value) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  return (
    <div className="sugesstion-auto">
      <div className="form-control-auto">
        <input
          className="input"
          placeholder={placeholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
          onKeyUp={handler}
        />
      </div>

      <div
        className="suggestions box"
        style={{ display: isHideSuggs ? "none" : "block" }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={"" + item + idx}
            onClick={() => {
              hideSuggs(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
