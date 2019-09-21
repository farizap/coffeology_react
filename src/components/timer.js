import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
// import store
import { connect } from "unistore/react";
import actionsDemo from "../store/actionsDemo";

// import component

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Start"
    };
  }

  changeTimerInterval = () => {
    this.timerInterval = setInterval(() => {
      this.props.setTimer(
        this.props.timerNow === 0 ? 0 : this.props.timerNow - 1
      );
    }, 100);
  };

  stopTimerInterval = () => {
    clearInterval(this.timerInterval);
  };

  changeAmountInterval = () => {
    this.amountInterval = setInterval(() => {
      this.props.setWaterNow(
        this.props.waterNow === this.props.waterLimit
          ? this.props.waterNow
          : this.props.waterNow +
              (this.props.stepWater * 10) / this.props.stepTime
      );
    }, 100);
  };

  stopAmountInterval = () => {
    clearInterval(this.amountInterval);
  };

  startTimer = () => {
    this.setState({ status: "Pause" }, () => {
      this.changeTimerInterval();
      this.changeAmountInterval();
    });
  };

  skipStep = () => {
    this.setState({ status: "Resume" }, () => {
      this.stopTimerInterval();
      this.stopAmountInterval();
    });
  };
  componentWillUpdate = (prevProps, prevState) => {
    if (prevProps.stepWater !== this.props.stepWater) {
      this.stopAmountInterval();
    }
  };

  componentWillUnmount() {
    clearInterval(this.amountInterval);
  }

  render() {
    return (
      <div>
        <h1>
          Time : {Math.floor(Math.floor(this.props.timerNow / 10) / 60)}.{" "}
          {Math.floor(this.props.timerNow / 10) % 60}.{" "}
          {this.props.timerNow % 10}{" "}
        </h1>
        {this.state.status !== "Pause" ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.startTimer}
          >
            {this.state.status}
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-danger"
            onClick={this.pauseTimer}
          >
            {this.state.status}
          </button>
        )}

        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            this.props.setTimer(0);
            this.props.setWaterNow(this.props.waterLimit);
          }}
        >
          Skip
        </button>
        <h1>Water : {Math.ceil(this.props.waterNow)} </h1>
        <ProgressBar
          animated
          min={this.props.waterLimit - this.props.stepWater}
          now={this.props.waterNow}
          max={this.props.waterLimit}
        />
        <ProgressBar
          animated
          variant="info"
          now={this.props.waterNow}
          max={this.props.recipe.water}
        />
      </div>
    );
  }
}

export default connect(
  actionsDemo
)(Timer);
