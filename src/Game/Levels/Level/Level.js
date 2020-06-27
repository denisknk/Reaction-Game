import React, { Component } from "react";
import "../Levels.css";

class levelIcon extends Component {
  // const onHover = () => {
  //   // console.log("here2", inp);
  //   getBackground(num);
  // };
  // const onLeave = (inp) => {
  //   // console.log("here2", inp);
  //   // getBackground();
  // };
  render() {
    return (
      <div
        // style={style}
        // onMouseOver={onHover}
        onMouseOver={() => {
          this.props.getBackgroundColor(this.props.num);
        }}
        // onMouseLeave={onLeave()}
        className="level-dot__wrapper"
      ></div>
    );
  }
}

export default levelIcon;
