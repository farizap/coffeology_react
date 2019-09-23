import React from 'react';

function methodCard(props) {
  return (
  <div className="container-fluid methodcard">
  <div className="row">
  <div className="col-12  border rounded text-center px-2 py-1 mb-1">
  <img src={props.icon} className="w-100 mb-2 pt-2" alt="altTag" />
				</div>
  <div className="col-12 p-0 methodname align-content-center text-center">
  <h6 className="m-0 py-2 border-top border-bottom">{props.name}</h6>
				</div>
			</div>
		</div>
  );
}

export default methodCard;
