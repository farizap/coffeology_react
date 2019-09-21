import React from 'react';

function AmountWater(props) {
  return (
    <div className="form-group mt-3" style={{ textAlign: 'left' }}>
      <label htmlFor="Jumlah Air">Jumlah Air </label>
      <input
        type="number"
        className="form-control"
        id="Jumlah Air"
        placeholder="200 ml"
        ref={props.ref}
        min="0"
      />
    </div>
  );
}

export default AmountWater;
