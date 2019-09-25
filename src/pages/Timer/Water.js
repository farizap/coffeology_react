import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// component that show circular progress of water in step running now
const Water = (props) => {
  return (
    <div>
      <CircularProgressbar
        value={props.waterNow === props.stepNow.amount ? 0 : props.waterNow}
        maxValue={props.stepNow.amount}
        text={`${Math.round(props.waterTotal)} mL`}
        styles={buildStyles({
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // Text size
          textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          textColor: '#',
          backgroundColor: '#3e98c7',
        })}
      />
      ;
    </div>
  );
};

export default Water;
