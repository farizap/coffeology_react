import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'unistore/react';
import StepCard from '../../components/stepCard';
import actionsDemo from '../../store/actionsDemo';

function RecipeSteps(props) {
  return (
    <div className="container-fluid recipeStepNow">
      <div className="row">
        <div className="col-12 bg-light  border mt-2">
          <h4 className="mb-0 font-weight-bold">
            {props.stepNow.stepNumber}
            .
            {' '}
            {props.stepTypes[
              props.stepNow.stepTypeID
            ].name.toUpperCase()}
          </h4>
          <div className="col-12">
            <h6 className="text-secondary">{props.stepNow.note}</h6>
          </div>
        </div>
        <div className="col-12">
          {props.recipeSteps
            .slice(props.Index + 1)
            .map((recipeStep, index) => (
              <div key={index}>
                <CSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                >
                  <div>
                    <StepCard data={recipeStep} />
                  </div>
                </CSSTransitionGroup>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default connect(
  'stepTypes, recipeSteps',
  actionsDemo,
)(RecipeSteps);
