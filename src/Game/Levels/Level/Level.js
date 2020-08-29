import React, { Component } from "react";
import "../Levels.css";

class levelIcon extends Component {
  render() {
    return (
      <div
        onMouseOver={() => {
          this.props.getBackgroundColor(this.props.num);
        }}
        className="level-dot__wrapper"
      ></div>
    );
  }
}

export default levelIcon;
