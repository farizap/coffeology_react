import React from 'react';

const RecipeCard = (props) => {
  // to show difficulty in recipe card
  const showDifficulty = (level) => {
    if (level === 1) {
      return (
        <div className="col-6 align-self-center text-left pt-1">
          <img
            src={require('../assets/images/dif1.png')}
            className="starrating mr-1"
            alt="alt tag"
          />
          <span>MUDAH</span>
        </div>
      );
    }
    if (level === 2) {
      return (
        <div className="col-6 align-self-center text-left pt-1">
          <img
            src={require('../assets/images/dif2.png')}
            className="starrating mr-1"
            alt="alt tag"
          />
          <span>SEDANG</span>
        </div>
      );
    }
    if (level === 3) {
      return (
        <div className="col-6 align-self-center text-left pt-1">
          <img
            src={require('../assets/images/dif3.png')}
            className="starrating mr-1"
            alt="alt tag"
          />
          <span>SULIT</span>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid recipeCard overlaycontainer border shadow-sm rounded my-3 pt-2 overlay">
      <div className="overlay">
        <div className="row h-100 content-image">
          <div className="col-3 align-top text-center">
            <div className="row px-3">
              <img
                src={props.method.icon}
                className="w-100 bgcolor2"
                alt="alt tag"
              />
            </div>
            <div className="row justify-content-center px-3 text-center">
              <h6>{props.method.name}</h6>
            </div>
          </div>
          <div className="col-9 align-self-center text-left">
            <div className="row">
              <h4 className="mb-0 font-weight-bold">
                {props.data.name.toUpperCase()}
              </h4>
            </div>
            {props.pageType === 'pageMyBrew' ? (
              <div className="row pb-1">
                <h6 className="mb-0 pl-2">
                  Dibuat : {props.data.createdAt.slice(0, -14)}
                </h6>
              </div>
            ) : (
              <div />
            )}
            <div className="row">
              <div className="col-12 align-self-center text-center pl-2 pt-1">
                <h6 className="bgcolor1 text-light rounded py-1 mb-0">
                  Diseduh : {props.data.brewCount} x
                </h6>
              </div>
              {showDifficulty(props.data.difficulty)}
              <div className="col-4 align-self-center px-0 py-0">
                {[1, 2, 3, 4, 5].map((number) =>
                  number <= Math.round(props.data.rating) ? (
                    <img
                      src={require('../assets/images/RecipeIcon/star1.png')}
                      className="starrating"
                      alt="alt tag"
                    />
                  ) : (
                    <img
                      src={require('../assets/images/RecipeIcon/star0.png')}
                      className="starrating"
                      alt="alt tag"
                    />
                  ),
                )}
              </div>
              <div className="col-2 align-self-center text-left pl-1 pt-1">
                [{String(props.data.rating).slice(0, 3)}]
              </div>
            </div>
          </div>
        </div>

        <div className="row py-1">
          <div className="col-3" />
          <div className="col-9 px-0">
            <div className="row">
              <div className="col-3 text-left">
                <h6>Beans</h6>
              </div>
              <div className="col-1 text-left">
                <h6>:</h6>
              </div>
              <div className="col-7 text-left">
                <h6>{props.data.beanName}</h6>
              </div>
              <div className="col-3 text-left">
                <h6>Process</h6>
              </div>
              <div className="col-1 text-left">
                <h6>:</h6>
              </div>
              <div className="col-7 text-left">
                <h6>{props.data.beanProcess}</h6>
              </div>
              <div className="col-3 text-left">
                <h6>Roasting</h6>
              </div>
              <div className="col-1 text-left">
                <h6>:</h6>
              </div>
              <div className="col-7 text-left">
                <h6>{props.data.beanRoasting}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-light border py-2">
          <div className="col-4 text-center px-0">
            <img
              src={require('../assets/images/RecipeIcon/time.png')}
              className="w-25 mr-1"
              alt="alt tag"
            />
            <span className="text-muted h6"> {props.time} </span>
          </div>
          <div className="col-4 text-center px-0">
            <img
              src={require('../assets/images/RecipeIcon/bean.png')}
              className="w-25 mr-1"
              alt="alt tag"
            />
            <span className="text-muted h6">
              {' '}
              {props.data.coffeeWeight} gram
            </span>
          </div>
          <div className="col-4 text-center px-0">
            <img
              src={require('../assets/images/RecipeIcon/amount.png')}
              className="w-25 mr-1"
              alt="alt tag"
            />
            <span className="text-muted h6"> {props.data.water} ml</span>
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="text">Demo</div>
      </div>
    </div>
  );
};

export default RecipeCard;
