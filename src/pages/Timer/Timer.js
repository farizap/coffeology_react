import React from 'react';

function Timer(props) {
  // Component that show time remaining in step running now
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-end">
        <div className="col-3 timerminute flex-fill align-text-bottom align-self-end text-right p-0">
          {Math.floor(Math.floor(props.timerNow / 10) / 60)}{' '}
        </div>
        <div className="col-1 timerminute flex-fill align-text-bottom align-self-end text-center p-0">
          {' '}
          :{' '}
        </div>
        <div className="col-3 timerminute flex-fill align-text-bottom align-self-end text-right p-0">
          {Math.floor(props.timerNow / 10) % 60}
        </div>
        <div className="col-1 timersecond flex-fill align-text-botto align-self-end text-center ">
          {' '}
          :{' '}
        </div>
        <div className="col-2 timersecond flex-fill align-text-bottom align-self-end text-left ">
          {props.timerNow % 10}{' '}
        </div>
      </div>
    </div>
  );
}

export default Timer;
