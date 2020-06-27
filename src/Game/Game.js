import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Levels from "./Levels/Levels.js";
import HowToPlay from "./HowToPlay/HowToPlay.js";
import "../App.css";

class Game extends Component {
  state = {
    isOpen: false,
  };
  updateClick = (value) => {
    this.setState({ isOpen: value });
  };
  onSelect = (index) => {
    console.log("index is", index);
  };
  render() {
    return (
      <div className="body_wrapper">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="info-icon"
          onClick={() => this.setState(() => ({ isOpen: true }))}
        />
        <HowToPlay isOpen={this.state.isOpen} updateClick={this.updateClick} />
        <div className="instructions">ВЫБЕРИТЕ УРОВЕНЬ</div>
        <Levels onSelect={this.onSelect} />
      </div>
    );
  }
}

export default Game;
