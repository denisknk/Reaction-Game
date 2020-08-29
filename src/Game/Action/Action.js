import React, { Component } from "react";
import "./Action.css";
import Play from "./Play.js";

class Action extends Component {
  render() {
    switch (this.props.level) {
      case 0:
        return (
          <Play
            column={3}
            changeLevel={this.props.changeLevel}
            timeOut={1700}
          />
        );
      case 1:
        return (
          <Play
            column={4}
            changeLevel={this.props.changeLevel}
            timeOut={1400}
          />
        );
      case 2:
        return (
          <Play
            column={5}
            changeLevel={this.props.changeLevel}
            timeOut={1000}
          />
        );
      default:
        return null;
    }
  }
}

export default Action;
