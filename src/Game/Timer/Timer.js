import React, { Component } from "react";
import "./Timer.css";

class Timer extends Component {
  state = {
    timeLeft: 3,
    redirect: false,
  };

  componentDidMount() {
    // this.startTimer();
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      let timeLeft = this.state.timeLeft - 1;
      if (timeLeft === 1) {
        clearInterval(timer);
        this.setState(() => ({
          redirect: true,
        }));
      }
      this.setState(() => ({
        timeLeft: timeLeft,
      }));
    }, 1000);
  }

  render() {
    return (
      <div className="body_wrapper">
        <div className="instructions">Choose Difficulty Level</div>
        <div className="timer-wrapper">{this.state.timeLeft}</div>
      </div>
    );
  }
}

export default Timer;
