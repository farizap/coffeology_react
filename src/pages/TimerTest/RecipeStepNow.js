import React from 'react';
import { connect } from 'unistore/react';

function RecipeStepNow(props) {
  return (
    <div className="container-fluid recipeStepNow">
      <div className="row">
        <div className="col-12">
          <h5 className="mb-0">
            {props.stepTypes[
              props.recipeSteps[props.index].stepNumber
            ].name.toUpperCase()}
          </h5>
          <div className="col-12">
            <h6 className="text-secondary">
              {props.recipeSteps[props.index].note}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect('recipeSteps, stepTypes')(RecipeStepNow);
