import React from 'react';
import { connect } from 'unistore/react';
import RadarBean from '../components/RadarBean';
import actionsBeans from '../store/actionsBeans';

import loading from '../assets/images/loading.gif';

class BeanDetail extends React.Component {
  componentWillMount = async () => {
    await this.props.getBeanById(this.props.match.params.beanID);
  };

	render() {
		if (!this.props.bean) {
			return <img src={loading} alt="loading..." />;
		} else {
			return (
				<div>
					<img
						className="backbutton"
						src={this.props.backButton}
						onClick={(event) => this.props.history.push('/beans')}
						alt="backButton"
					/>
					<div className="container">
						<div className="row">
							<div className="col-12 pt-4">
								<h4 className="font-weight-bold mb-0">{this.props.bean.name.toUpperCase()}</h4>
							</div>
							<div className="col-12">
								<h6 className="text-secondary">
									{this.props.origins[this.props.bean.originID - 1].name} | {this.props.bean.location}
								</h6>
								<h6 className="text-secondary">{this.props.bean.cupping}</h6>
							</div>
							<div className="col-12 py-3">
								<img src={this.props.bean.photo} alt="" className="w-100" />
							</div>
							<div className="col-12 pb-4">
								<p class="text-justify">{this.props.bean.description}</p>
							</div>
							<div className="col-12">
								<h6 className="border-bottom">ADVANTAGE</h6>
								{this.props.bean.advantage}
							</div>
							<div className="col-12 pt-4">
								<h6 className="border-bottom">DISADVANTAGE</h6>
								{this.props.bean.disadvantage}
							</div>

              <div className="col-12 pt-4">
                <h6 className="border-bottom">CITA RASA</h6>

                <RadarBean
                  data={{
                    fragrance: this.props.bean.fragrance,
                    flavor: this.props.bean.flavor,
                    aftertaste: this.props.bean.aftertaste,
                    acidity: this.props.bean.acidity,
                    body: this.props.bean.body,
                    balance: this.props.bean.balance,
                    uniformity: this.props.bean.uniformity,
                    cleanCups: this.props.bean.cleanCups,
                    sweetness: this.props.bean.sweetness,
                    overall: this.props.bean.overall,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  'bean, origins, backButton',
  actionsBeans,
)(BeanDetail);
