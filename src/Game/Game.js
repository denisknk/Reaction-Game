import React, { Component } from "react";
import "../App.css";
import Menu from "./Menu/Menu.js";
import Action from "./Action/Action.js";
import Timer from "./Timer/Timer.js";
import End from "./End/End.js";
import {
  getScore,
  getHighestScore,
  getAverageReactionTime,
} from "../services/all";
import { addEventListener } from "../services/all";

class Game extends Component {
  gameConditions = {
    menu: "menu",
    timer: "timer",
    action: "action",
    end: "end",
  };

  state = {
    width: 0,
    height: 0,
    level: null,
    gameCondition: this.gameConditions.menu,
  };

  changeLevel = (number, condition) => {
    this.setState(() => ({
      level: number,
      gameCondition: condition,
    }));
  };

  componentDidMount() {
    addEventListener(() => {
      this.setState(() => ({
        score: getScore(),
        highestScore: getHighestScore(),
        averageReaction: getAverageReactionTime(),
      }));
    });

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };
  render() {
    // console.log(this.state);
    switch (this.state.gameCondition) {
      case this.gameConditions.menu:
        return <Menu changeLevel={this.changeLevel} />;
      case this.gameConditions.timer:
        return <Timer />;
      case this.gameConditions.action:
        return (
          <Action level={this.state.level} changeLevel={this.changeLevel} />
        );
      case this.gameConditions.end:
        return (
          <End
            score={this.state.score}
            highestScore={this.state.highestScore}
            changeLevel={this.changeLevel}
            averageReaction={this.state.averageReaction}
          />
        );
      default:
        return <Menu changeLevel={this.changeLevel} />;
    }
  }
}

export default Game;
