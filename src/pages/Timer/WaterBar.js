import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

// component that show progress bar of total water added in recipe
const WaterBar = (props) => {
  const recipeWater = JSON.parse(sessionStorage.getItem('recipe')).water;
  return (
    <ProgressBar
      animated
      variant="info"
      now={props.waterTotal}
      max={recipeWater}
    />
  );
};

export default WaterBar;
