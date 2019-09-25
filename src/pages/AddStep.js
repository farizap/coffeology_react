import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

// import store
import { connect } from 'unistore/react';
import actionsRecipes from '../store/actionsRecipes';

// import img
import plus from '../assets/images/plus.png';
import timer from '../assets/images/RecipeIcon/timer.png';
import water from '../assets/images/RecipeIcon/water.png';
import loading from '../assets/images/loading.gif';

class AddStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepTemporary: []
		};
		this.note = React.createRef();
	}

	componentDidMount = async () => {
		if (sessionStorage.getItem('note') === null) {
			sessionStorage.setItem('note', '');
		} else {
			this.note.current.value = sessionStorage.getItem('note');
		}
		if (sessionStorage.getItem('stepTemporary') !== null) {
			await this.setState({
				stepTemporary: JSON.parse(sessionStorage.getItem('stepTemporary'))
			});
		}
	};

	convertSeconds(value) {
		let minutes = Math.floor(parseInt(value) / 60);
		let seconds = parseInt(value) - minutes * 60;
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`;
	}

	deteleStep = async (event, idx) => {
		event.preventDefault();

		const temp = this.state.stepTemporary.filter((step, index) => index !== idx);
		await this.setState(
			{
				stepTemporary: temp
			},
			() => {
				sessionStorage.setItem('stepTemporary', JSON.stringify(this.state.stepTemporary));
			}
		);
	};

	// handle when user clicked addStep Button, redirect to inputstep page
	addStep = (e) => {
		e.preventDefault();
		sessionStorage.setItem('note', this.note.current.value);
		this.props.history.push('/recipes/create/inputstep');
	};

	// handle when user clicked submit button, post recipe with data from sessionStorage
	handleSubmit = async (e) => {
		e.preventDefault();
		let recipes = JSON.parse(sessionStorage.getItem('Recipe'));
		let steps = JSON.parse(sessionStorage.getItem('stepTemporary'));
		let recipeDetails = JSON.parse(sessionStorage.getItem('RecipeDetail'));
		recipeDetails['note'] = this.note.current.value;

		// validation waterAmount every Step = waterAmount Recipe
		let totalWaterStep = 0;
		this.state.stepTemporary.map((step, index) => (totalWaterStep = totalWaterStep + step.amount));
		if (parseInt(totalWaterStep) > parseInt(recipes.water)) {
			return this.props.Toast.fire({
				type: 'error',
				title: `Total Air Pada Step Melebihi ${recipes.water} ml`
			});
		} else if (parseInt(totalWaterStep) < parseInt(recipes.water)) {
			return this.props.Toast.fire({
				type: 'error',
				title: `Total Air Pada Step Masih Kurang ${parseInt(recipes.water) - parseInt(totalWaterStep)} ml`
			});
		}
		this.props.setShowPostRecipe(true);

		setTimeout(async () => {
			let time = 0;
			steps.map((step, index) => (time = time + step.time));
			recipes['time'] = time;

			let data = {
				recipes: recipes,
				recipeDetails: recipeDetails,
				steps: steps
			};
			await this.props.postRecipe(data);

			if (sessionStorage.getItem('Recipe') === null) {
				this.props.history.push('/activity');
			}
		}, 500);
	};

	render() {
		return (
			<div>
				<img
					className="backbutton"
					src={this.props.backButton}
					onClick={(event) => this.props.history.push('/recipes/create')}
					alt="backButton"
				/>
				<div className="container pt-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h4 className="font-weight-bold">TAMBAH LANGKAH</h4>
						</div>
						<div className="col-12">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="row justify-content-center bg-light border-top border-bottom py-2 my-2">
										CATATAN
									</div>
									<textarea
										className="form-control"
										id="note"
										rows="3"
										maxLength="250"
										ref={this.note}
										required
									></textarea>
								</div>

								<div className="row justify-content-center bg-light border-top border-bottom py-2 mt-4 mb-2">
									TAHAPAN
								</div>
								<div className="">
									{this.state.stepTemporary.map((step, index) => {
										return (
											<div className=" " key={index}>
												<div className="row justify-content-between pt-0 pb-1">
													<div className="col-2 px-0 text-center align-self-start">
														<h5 className="bg-light p-3 border">{index + 1}</h5>
													</div>
													<div className="col-10 border py-2 pl-2">
														<div className="row">
															<div className="col-3 text-right align-self-center">
																<img
																	src={this.props.stepTypes[step.stepTypeID].icon}
																	width="100%"
																	alt="altTag"
																/>
															</div>
															<div className="col-9 text-left align-self-center">
																<div className="row ">
																	<div className="col-9 px-0 mt-1">
																		<h5>
																			{this.props.stepTypes[
																				step.stepTypeID
																			].name.toUpperCase()}
																		</h5>
																	</div>
																	<div className="col-3 pl-0 pr-1 mb-2  text-right">
																		<button
																			type="button"
																			onClick={(e) => this.deteleStep(e, index)}
																			className="btn btn-dark"
																			width="50%"
																		>
																			X
																		</button>
																	</div>
																</div>
																<div className="row">
																	<div className="col-6 ">
																		<div className="row">
																			<div className="col-3 px-0">
																				<img
																					src={require('../assets/images/RecipeIcon/time.png')}
																					className="w-100"
																					alt="alt tag"
																				/>
																			</div>
																			<div className="col-9 px-0 text-left align-self-center text-secondary">
																				{this.convertSeconds(step.time)}s
																			</div>
																		</div>
																	</div>
																	<div className="col-6 ">
																		{parseInt(step.stepTypeID) === 1 ||
																		parseInt(step.stepTypeID) === 2 ||
																		parseInt(step.stepTypeID) === 12 ? (
																			<div className="row">
																				<div className="col-3 px-0">
																					<img
																						src={require('../assets/images/RecipeIcon/amount.png')}
																						className="w-100"
																						alt="alt tag"
																					/>
																				</div>
																				<div className="col-9 px-0 text-left align-self-center text-secondary">
																					{step.amount} ml
																				</div>
																			</div>
																		) : (
																			<div />
																		)}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
									<div className="border mt-2 mb-4 py-4">
										<Link onClick={(e) => this.addStep(e)} to="/recipes/create/inputstep">
											<img className="mr-2" src={plus} alt="alt tag" width="6%" />
											Add Steps
										</Link>
									</div>
								</div>
								<button type="submit" className="btn btn-dark btn-block mt-4" value="Submit">
									Simpan
								</button>
							</form>
							<Modal show={this.props.showPostRecipe}>
								<div className="container-fluid">
									<div className="row justify-content-center" style={{ margin: '0 auto' }}>
										<Modal.Header>
											<img src={loading} alt="altTag" width="300px"></img>
										</Modal.Header>
									</div>
								</div>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	'stepTypes, Toast, stepTemporary, backButton, showPostRecipe',
	actionsRecipes
)(AddStep);
