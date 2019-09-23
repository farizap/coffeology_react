import React from 'react';
import { Link } from 'react-router-dom';

// import store
import { connect } from 'unistore/react';

// import component
import MethodCard from '../components/MethodCard';
import HomeCarousel from '../components/HomeCarousel';

// import image

class Brewing extends React.Component {
  render() {
    return (
  <div>
  <div className="container brewing">
  <div className="row rowhomeimage">
  <HomeCarousel />
					</div>
  <div className="row justify-content-center pt-3">
  <div className="col-12">
  <br />
  <h4>METODE BREWING</h4>
						</div>
  {this.props.methods.map((method, index) => (
  <div
  className="col-4
                             py-2 px-2"
							>
  <Link to={`/recipes/${method.id}`}>
  <MethodCard name={method.name} icon={method.icon} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
    );
  }
}

export default connect('methods,recipeSteps, timerNowIndex, timerUp')(Brewing);
