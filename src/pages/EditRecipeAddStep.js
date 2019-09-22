import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

// import store
import { connect } from 'unistore/react';
import actionsRecipes from '../store/actionsRecipes';

// import img
import Plus from '../assets/images/plus.png';
import timer from '../assets/images/RecipeIcon/timer.png';
import water from '../assets/images/RecipeIcon/water.png';
import loading from '../assets/images/loading.gif';

class AddStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepTemporary: [],
    };
    this.note = React.createRef();
  }

  componentDidMount = async () => {
    this.note.current.value = sessionStorage.getItem('note');
    await this.setState({
      stepTemporary: JSON.parse(sessionStorage.getItem('stepTemporary')),
    });
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

    const temp = this.state.stepTemporary.filter(
      (step, index) => index !== idx,
    );
    await this.setState(
      {
        stepTemporary: temp,
      },
      () => {
        sessionStorage.setItem(
          'stepTemporary',
          JSON.stringify(this.state.stepTemporary),
        );
      },
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
    this.state.stepTemporary.map(
      (step, index) => (totalWaterStep = totalWaterStep + step.amount),
    );
    if (parseInt(totalWaterStep) > parseInt(recipes.water)) {
      return this.props.Toast.fire({
        type: 'error',
        title: `Total Air Pada Step Melebihi ${recipes.water} ml`,
      });
    } else if (parseInt(totalWaterStep) < parseInt(recipes.water)) {
      return this.props.Toast.fire({
        type: 'error',
        title: `Total Air Pada Step Masih Kurang ${parseInt(recipes.water) -
          parseInt(totalWaterStep)} ml`,
      });
    }
    this.props.setShowPutRecipe(true);

    setTimeout(async () => {
      let time = 0;
      steps.map((step, index) => (time = time + step.time));
      recipes['time'] = time;

      let data = {
        recipes: recipes,
        recipeDetails: recipeDetails,
        steps: steps,
      };

      await this.props.putRecipe(data, this.props.match.params.recipeID);

      if (sessionStorage.getItem('Recipe') === null) {
        this.props.history.push(`/recipe/${this.props.match.params.recipeID}`);
      }
    }, 500);
  };

  render() {
    return (
      <div>
        <img
          className="backbutton"
          src={this.props.backButton}
          onClick={(event) =>
            this.props.history.push(
              `/recipe/edit/${this.props.match.params.recipeID}`,
            )
          }
          alt="backButton"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="row justify-content-center bg-success mb-2">
                    <label for="note">Catatan</label>
                  </div>
                  <textarea
                    className="form-control"
                    id="note"
                    rows="3"
                    placeholder="catatan"
                    maxLength="250"
                    ref={this.note}
                    required
                  ></textarea>
                </div>

                <div className="row justify-content-center bg-success mb-2">
                  Tahapan
                </div>
                <div className="card">
                  {this.state.stepTemporary.map((step, index) => {
                    return (
                      <div className="card-body border" key={index}>
                        <div className="row justify-content-between">
                          <div className="col-4">
                            <img
                              src={this.props.stepTypes[step.stepTypeID].icon}
                              width="100%"
                              alt="altTag"
                            />
                          </div>
                          <div className="col-4">
                            {this.props.stepTypes[step.stepTypeID].name}
                          </div>
                          <div className="col-4">
                            <div className="row justify-content-center mb-3">
                              <img
                                className="mr-2"
                                src={timer}
                                width="20%"
                                alt="altTag"
                              />
                              {this.convertSeconds(step.time)}s
                            </div>
                            {parseInt(step.stepTypeID) === 1 ||
                            parseInt(step.stepTypeID) === 2 ||
                            parseInt(step.stepTypeID) === 12 ? (
                              <div className="row justify-content-center">
                                <img src={water} width="20%" alt="AltTag" />
                                {step.amount} ml
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <div className="row justify-content-end">
                          <button
                            type="button"
                            onClick={(e) => this.deteleStep(e, index)}
                            className="btn btn-primary"
                            width="50%"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <hr />
                  <div className="card-body">
                    <Link
                      onClick={(e) => this.addStep(e)}
                      to="/recipes/create/inputstep"
                    >
                      <img
                        className="mr-2"
                        src={Plus}
                        alt="alt tag"
                        width="6%"
                      />
                      Add Steps
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Submit"
                >
                  Simpan
                </button>
              </form>
              {/* page loading when pust new recipe */}
              <Modal show={this.props.showPutRecipe}>
                <div className="container-fluid">
                  <div
                    className="row justify-content-center"
                    style={{ margin: '0 auto' }}
                  >
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
  'Toast, stepTypes, stepTemporary, methods, grinds, flavors, origins, recipeDetails, backButton, recipe, recipeSteps, waterLimit, recipeCreator, reviews, userMe, showPutRecipe',
  actionsRecipes,
)(AddStep);
