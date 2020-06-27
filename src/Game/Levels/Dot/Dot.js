import React from "react";
import "./Dot.css";
export default function Dot({ color, blur, hover, press }) {
  return (
    <div
      style={{ backgroundColor: color }}
      onMouseEnter={hover}
      onClick={press}
      onMouseLeave={blur}
      className="level-dot__wrapper"
    ></div>
  );
}
