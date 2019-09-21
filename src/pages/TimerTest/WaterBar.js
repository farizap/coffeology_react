import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'unistore/react';
import actionsDemo from '../../store/actionsDemo';

function WaterBar(props) {
  const recipeWater = JSON.parse(sessionStorage.getItem('recipe')).water;
  return (
    <ProgressBar
      animated
      variant="info"
      now={props.waterTotal}
      max={recipeWater}
    />
  );
}

export default connect(
  'recipeSteps',
  actionsDemo,
)(WaterBar);
