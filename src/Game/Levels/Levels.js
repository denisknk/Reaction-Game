import React, { Component } from "react";
import "./Levels.css";
import Dot from "./Dot/Dot";
// import { Link } from "react-router-dom";

class Levels extends Component {
  state = {
    colors: ["#555555", "#555555", "#555555"],
  };

  setDefaultColor = () => {
    this.setState(() => ({
      colors: ["#555555", "#555555", "#555555"],
    }));
  };

  onHover = (index) => () => {
    switch (index) {
      case 0:
        this.setState(() => ({
          colors: ["#59DB28", "#555555", "#555555"],
        }));
        break;
      case 1:
        this.setState(() => ({
          colors: ["#F6B921", "#F6B921", "#555555"],
        }));
        break;
      case 2:
        this.setState(() => ({
          colors: ["#CA0424", "#CA0424", "#CA0424"],
        }));
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <div className="levels__wrapper">
        {this.state.colors.map((color, index) => (
          <Dot
            color={color}
            blur={this.setDefaultColor}
            hover={this.onHover(index)}
            press={() => this.props.onSelect(index)}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default Levels;
