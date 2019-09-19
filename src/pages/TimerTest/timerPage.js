import React, { useState, useEffect, useRef } from "react";
import { connect } from "unistore/react";
import actionsDemo from "../../store/actionsDemo";
import SkipNextIcon from "@material-ui/icons/SkipNext";
// import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import Timer from "./timer";
import TimerButton from "./timerButton";
import RecipeSteps from "./RecipeSteps";
import WaterBar from "./WaterBar";
import Water from "./Water";

function Counter(props) {
  const [timer, setTimer] = useState({
    stepIndex: 0,
    waterNow: 0,
    timeNow: JSON.parse(sessionStorage.getItem("recipeSteps"))[0].time * 10,
    stepNow: JSON.parse(sessionStorage.getItem("recipeSteps"))[0],
    waterTotal: 0,
    recipeSteps: JSON.parse(sessionStorage.getItem("recipeSteps"))
  });
  const [delay, setDelay] = useState(100);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    async () => {
      // Your custom logic here
      // console.log(timer.stepNow);
      setTimer({
        ...timer,
        timeNow: timer.timeNow - 1,
        waterNow:
          timer.waterNow + timer.stepNow.amount / timer.stepNow.time / 10,
        waterTotal:
          timer.waterTotal + timer.stepNow.amount / timer.stepNow.time / 10
      });
      if (
        timer.recipeSteps[timer.stepIndex + 1] === undefined &&
        timer.timeNow === 0
      ) {
        props.history.push("/recipe/review/" + props.match.params.recipeID);
      } else if (timer.timeNow === 0) {
        setTimer({
          ...timer,
          timeNow: timer.recipeSteps[timer.stepIndex + 1].time * 10,
          waterNow: 0,
          stepNow: timer.recipeSteps[timer.stepIndex + 1],
          stepIndex: timer.stepIndex + 1
        });
      }
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    return () => {
      console.log("willUnmount");
      setDelay(null);
    };
  }, []);

  function handleIsRunningChange(e) {
    setIsRunning(!isRunning);
  }

  function handleSkipButton(e) {
    setIsRunning(false);
    if (timer.recipeSteps[timer.stepIndex + 1] === undefined) {
      props.history.push("/recipe/review/" + props.match.params.recipeID);
    } else if (timer.stepIndex === 0) {
      setTimer({
        ...timer,
        timeNow: timer.recipeSteps[timer.stepIndex + 1].time * 10,
        waterNow: 0,
        stepNow: timer.recipeSteps[timer.stepIndex + 1],
        waterTotal: timer.recipeSteps[timer.stepIndex].amount,
        stepIndex: timer.stepIndex + 1
      });
    } else {
      setTimer({
        ...timer,
        timeNow: timer.recipeSteps[timer.stepIndex + 1].time * 10,
        waterNow: 0,
        stepNow: timer.recipeSteps[timer.stepIndex + 1],
        waterTotal: timer.recipeSteps
          .slice(0, timer.stepIndex + 1)
          .reduce((sum, num, index) => {
            if (index === 1) {
              sum = sum.amount + num.amount;
            } else {
              sum = sum + num.amount;
            }
            return sum;
          }),
        stepIndex: timer.stepIndex + 1
      });
    }
  }

  return (
    <div>
      <Timer timerNow={timer.timeNow} />

      <br />
      <TimerButton isRunning={isRunning} onClick={handleIsRunningChange} />
      <Fab
        color="primary"
        aria-label="add"
        // className={classes.fab}
        onClick={handleSkipButton}
      >
        <SkipNextIcon />
      </Fab>
      {/* <button onClick={handleSkipButton}> Skip</button> */}
      <Water
        waterTotal={timer.waterTotal}
        stepNow={timer.stepNow}
        waterNow={timer.waterNow}
      />
      <WaterBar
        waterTotal={timer.waterTotal}
        stepNow={timer.stepNow}
        waterNow={timer.waterNow}
      />
      <RecipeSteps startIndex={timer.stepIndex} />
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default connect(
  "recipeSteps,stepIndex",
  actionsDemo
)(Counter);
