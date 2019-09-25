import React from 'react';

const ReviewCard = (props) => {
  return (
    <div className="container-fluid recipeCard border ">
      <div className="row h-100 pt-2 justify-content-center ">
        <div className="col-6 align-self-center">
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
        <div className="col-6">
          <div className="row">
            <h5>{props.data.user.name}</h5>
          </div>
          <div className="row">
            <h6 className="mb-0">{props.data.createdAt.slice(0, -9)}</h6>
          </div>
        </div>
        <div className="col-12 pt-3">
          <h4>{props.data.content}</h4>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
