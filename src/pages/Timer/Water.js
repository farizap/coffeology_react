import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// component that show circular progress of water in step running now
function Water(props) {
  return (
    <div>
      {/* <h1>Water : {Math.floor(props.waterTotal)} </h1> */}
      <CircularProgressbar
        value={props.waterNow === props.stepNow.amount ? 0 : props.waterNow}
        maxValue={props.stepNow.amount}
        text={`${Math.round(props.waterTotal)} mL`}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          // rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          // pathColor: `rgba(62, 152, 199, ${
          //   props.waterNow === props.stepNow.amount
          //     ? 0
          //     : props.waterNow / props.stepNow.amount
          // })`,
          // trail: {
          //   // Trail color
          //   stroke: "#d6d6d6",
          //   // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          //   strokeLinecap: "butt",
          //   // Rotate the trail
          //   transform: "rotate(0.25turn)",
          //   transformOrigin: "center center"
          // },

          textColor: '#',
          // trailColor: "#d6d6d6",
          backgroundColor: '#3e98c7',
        })}
      />
      ;
    </div>
  );
}

export default Water;
