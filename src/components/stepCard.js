import React from 'react';
import { connect } from 'unistore/react';

const convertSeconds = (secondsInput) => {
  let minutes = Math.floor(parseInt(secondsInput) / 60);
  let seconds = parseInt(secondsInput) - minutes * 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

function stepCard(props) {
  return (
    <div className="container-fluid stepCard ">
      <div className="row pt-2">
        <div className="col-2 px-0 text-center align-self-start">
          <h5 className="bg-light p-3 border">
            {props.data.stepNumber}
          </h5>
        </div>
        <div className="col-10 border py-2 pl-2">
          <div className="row">
            <div className="col-3 text-right align-self-center">
              <img
                src={
                                    props.stepTypes[props.data.stepTypeID].icon
                                }
                className="w-100 bg-light rounded"
                alt="alt tag"
              />
            </div>
            <div className="col-9 text-left align-self-center">
              <div className="row ">
                <h5>
                  {props.stepTypes[
                    props.data.stepTypeID
                  ].name.toUpperCase()}
                </h5>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <div className="row">
                    <div className="col-3 px-0">
                      <img
                        src={require('../assets/images/RecipeIcon/time.png')}
                        className="w-100"
                        alt="alt tag"
                      />
                    </div>
                    <div className="col-9 px-0 text-left align-self-center text-secondary">
                      {convertSeconds(props.data.time)}
                    </div>
                  </div>
                </div>
                <div className="col-6 ">
                  {props.data.amount !== 0 ? (
                    <div className="row">
                      <div className="col-3 px-0">
                        <img
                          src={require('../assets/images/RecipeIcon/amount.png')}
                          className="w-100"
                          alt="alt tag"
                        />
                      </div>
                      <div className="col-9 px-0 text-left align-self-center text-secondary">
                        {Math.floor(
                          props.beanRatio
                                                        * props.data.amount,
                        )}
                        {' '}
                                                ml
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
          {props.data.note !== '' ? (
            <div className="row pt-3">
              {' '}
              <div className="col-2 pr-1">
                <img
                  src={require('../assets/images/RecipeIcon/note.png')}
                  className="w-75"
                  alt="alt tag"
                />
              </div>
              <div className="col-10 px-0 text-left align-self-center">
                {props.data.note}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
export default connect('stepTypes, beanRatio')(stepCard);
