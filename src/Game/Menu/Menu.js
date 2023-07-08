import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Levels from "../Levels/Levels.js";
import HowToPlay from "../HowToPlay/HowToPlay.js";
import "../../App.css";
import PropTypes from "prop-types";
import { startTimeCount, handleTimeout } from "../../services/all.js";

class Menu extends Component {
  state = {
    isOpen: false,
  };
  updateClick = (value) => {
    this.setState({ isOpen: value });
  };
  onSelect = (index) => {
    let timeOut;
    switch (index) {
      case 0:
        timeOut = 1700;
        break;
      case 1:
        timeOut = 1400;
        break;
      case 2:
        timeOut = 540;
        break;
      default:
        return;
    }
    this.props.changeLevel(index, "timer");
    setTimeout(() => {
      this.props.changeLevel(index, "action");
      startTimeCount();
      handleTimeout(this.props.changeLevel, timeOut);
    }, 3000);
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
        <div className="instructions">Choose Difficulty Level</div>
        <Levels onSelect={this.onSelect} />
      </div>
    );
  }
}

Menu.propTypes = {
  changeLevel: PropTypes.func,
};

export default Menu;
