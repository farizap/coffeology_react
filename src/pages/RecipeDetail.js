import React from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import store
import { connect } from 'unistore/react';
import actionsRecipes from '../store/actionsRecipes';

// import component
import StepCard from '../components/StepCard';
import ReviewCard from '../components/ReviewCard';

// import components
import RadarRecipe from '../components/RadarRecipe';
import Disqus from 'disqus-react';

import loading from '../assets/images/loading.gif';

class RecipeDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showComment: false,
      showReview: false,
      showDelete: false,
      showStartDemo: false, // add to start demo
      coffeeweight: 0,
      water: 0,
      ratio: 0,
      recipeSteps: [],
      userID: 0, // add to show edit and delete button
    };
  }

  handleShowComment = () => {
    this.setState({ showComment: true });
  };

  //

  handleHideComment = () => {
    this.setState({ showComment: false });
  };

  handleShowReview = async () => {
    this.setState({ showReview: true });
  };

  handleHideReview = () => {
    this.setState({ showReview: false });
  };

  componentWillUnmount() {
    this.props.setRecipe(null);
    this.props.setDataUserMe(null);
  }

  async componentDidMount() {
    await this.props.getRecipeByID(this.props.match.params.recipeID);
    await this.setState({
      coffeeweight: this.props.recipe.coffeeWeight,
      water: this.props.recipe.water,
      ratio: this.props.recipe.water / this.props.recipe.coffeeWeight,
      recipeSteps: this.props.recipeSteps,
    });
    await this.props.getReview({ recipeID: this.props.match.params.recipeID });

    // this.props.setRecipeSteps(this.state.recipeSteps);
    this.props.setResetTimer();

    if (sessionStorage.getItem('token') !== null) {
      await this.props.getProfile();
      await this.setState({ userID: this.props.userMe.id });
    }
  }

  // convert input in seconds to string with format 'minute:seconds
  convertSeconds(secondsInput) {
    let minutes = Math.floor(parseInt(secondsInput) / 60);
    let seconds = parseInt(secondsInput) - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  /* 
  handle on Click button, check if token is null, redirect to login page
  if token exist, redirect to recipe demo 
  */
  handleOnClickButton = async (event) => {
    event.preventDefault();
    if (sessionStorage.getItem('token') === null) {
      return this.setState({ showStartDemo: true });
    } else {
      await this.props.setRecipeSteps(this.state.recipeSteps);
      sessionStorage.setItem(
        'recipeSteps',
        JSON.stringify(this.state.recipeSteps),
      );
      sessionStorage.setItem('recipe', JSON.stringify(this.props.recipe));
      this.props.history.push(
        '/recipe/demo/' + this.props.match.params.recipeID,
      );
    }
  };

  // handle when user input custom coffee weight, change amount water in every recipe steps
  handleOnChangeCoffee = (event) => {
    event.preventDefault();
    if (event.target.value > 0) {
      const waterTotal = this.state.ratio * event.target.value;

      const recipeSteps = [];

      this.state.recipeSteps.forEach((recipeStep) => {
        recipeStep['amount'] =
          (recipeStep['amount'] / this.state.water) * waterTotal;
        recipeSteps.push(recipeStep);
      });

      this.setState({
        coffeeWeight: event.target.value,
        water: event.target.value * this.state.ratio,
        recipeSteps: recipeSteps,
      });
    }
  };

  // handle when user delete want to delete recipe, only permitted to the recipe owner
  handleDelete = async (e, id) => {
    e.preventDefault();
    await this.props.deleteRecipe(id);

    if (this.props.deleteRecipeStatus) {
      await this.setState({ showDelete: false });
      this.props.history.push('/activity');
    }

    await this.setState({ showDelete: false });
  };

  // handle when user edit want to delete recipe, only permitted to the recipe owner
  handleEditRecipe = async (e, id) => {
    e.preventDefault();
    await sessionStorage.setItem('Recipe', JSON.stringify(this.props.recipe));
    await sessionStorage.setItem(
      'RecipeDetail',
      JSON.stringify(this.props.recipeDetails),
    );
    await sessionStorage.setItem('note', this.props.recipeDetails.note);
    await sessionStorage.setItem(
      'stepTemporary',
      JSON.stringify(this.props.recipeSteps),
    );
    this.props.history.push(`/recipe/edit/${id}`);
  };

  render() {
    if (this.props.recipe === null) {
      return <img src={loading} alt="loading..." />;
    } else if (
      sessionStorage.getItem('token') !== null &&
      this.props.userMe === null
    ) {
      return <img src={loading} alt="loading..." />;
    } else if (this.props.recipe === false) {
      return (
        <div>
          <img
            className="backbutton"
            src={this.props.backButton}
            onClick={(event) => this.props.history.goBack()}
            alt="backButton"
          />
          <h3>Data Resep Tidak Ada</h3>
        </div>
      );
    } else {
      const disqusShortname = 'coffeology'; //found in your Disqus.com dashboard
      const disqusConfig = {
        url: 'https://coffeology/recipe/' + this.props.match.params.recipeID, //this.props.pageUrl
        identifier: this.props.match.params.recipeID, //this.props.uniqueId
        title: 'Title of Your Article' + this.props.match.params.recipeID, //this.props.title
      };

      return (
        <div>
          <img
            className="backbutton"
            src={this.props.backButton}
            onClick={(event) => this.props.history.goBack()}
            alt="backButton"
          />
          {this.state.userID === this.props.recipe.userID ? (
            <div align="right">
              <button
                onClick={(e) =>
                  this.handleEditRecipe(e, this.props.match.params.recipeID)
                }
                type="button"
                className="btn btn-secondary btn-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ showDelete: true });
                }}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="pt-4"></div>
          )}

          <div className="container">
            {/* to show delete confirmation */}
            <Modal show={this.state.showDelete}>
              <Modal.Header>
                <Modal.Title>Delete Resep</Modal.Title>
              </Modal.Header>
              <Modal.Body>Apakah anda yakin menghapus resep ini ?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ showDelete: false });
                  }}
                >
                  Batal
                </Button>
                <Button
                  value="Submit"
                  type="submit"
                  variant="primary"
                  onClick={(e) =>
                    this.handleDelete(e, this.props.match.params.recipeID)
                  }
                >
                  Hapus
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="row justify-content-center">
              <h4 className="font-weight-bold mb-0">
                {this.props.recipe.name.toUpperCase()}
              </h4>
            </div>

            <div className="row justify-content-center">
              <h6 className="text-secondary">
                <Link to={'/profile/' + this.props.recipeCreator.id}>
                  {this.props.recipeCreator.name}
                </Link>
              </h6>
            </div>

            <div className="row mr-0 py-3">
              <div className="col-4 text-center">
                <img
                  className="w-75 bgcolor2"
                  src={this.props.methods[this.props.recipe.methodID - 1].icon}
                  alt="methodIcon"
                />
                <br />
                <h6>
                  {this.props.methods[this.props.recipe.methodID - 1].name}
                </h6>
              </div>
              <div className="col-8 ">
                <div className="row">
                  <div className="col-4 text-left">Beans</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6 text-left">
                    {this.props.recipe.beanName}
                  </div>
                  <div className="col-4 text-left">Process</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6 text-left">
                    {this.props.recipe.beanProcess}
                  </div>
                  <div className="col-4 text-left">Roasting</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6 text-left">
                    {this.props.recipe.beanRoasting}
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center py-2 mb-4 border-top border-bottom  bg-light ">
              <div className="col-4  text-center">
                <div className="row justify-content-center">
                  {' '}
                  <h6 className="border-bottom font-weight-bold">WAKTU</h6>
                </div>
                <div className="row justify-content-center align-items-center ">
                  <img
                    className="w-25 mr-1"
                    src={require('../assets/images/RecipeIcon/timer.png')}
                    alt="alt tag"
                  />
                  <span>{this.convertSeconds(this.props.recipe.time)}</span>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="row justify-content-center">
                  {' '}
                  <h6 className="border-bottom font-weight-bold">SUHU AIR</h6>
                </div>
                <div className="row justify-content-center align-items-center">
                  <img
                    className="w-25 mr-1"
                    src={require('../assets/images/RecipeIcon/thermometer.png')}
                    alt="alt tag"
                  />
                  <span>{this.props.recipeDetails.waterTemp} (&deg;C)</span>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="row justify-content-center">
                  {' '}
                  <h6 className="border-bottom font-weight-bold">GRIND</h6>
                </div>
                <div className="row justify-content-center align-items-center">
                  <img
                    className="w-25 mr-1"
                    src={require('../assets/images/RecipeIcon/coffee-grinder.png')}
                    alt="alt tag"
                  />
                  <span>
                    {
                      this.props.grinds[this.props.recipeDetails.grindSize - 1]
                        .name
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 text-right">
                <div className="row font-weight-bold justify-content-end">
                  KOPI
                </div>
                <div className="row justify-content-end">
                  {this.props.recipe.coffeeWeight} gram
                </div>
              </div>
              <div className="col-2 align-content-center ">
                <img
                  className="w-100"
                  src={require('../assets/images/RecipeIcon/coffee-grain.png')}
                  alt="coffee-grain"
                />
              </div>
              <div className="col-2">
                <img
                  className="w-100"
                  src={require('../assets/images/RecipeIcon/raindrop.png')}
                  alt="raindrop"
                />
              </div>
              <div className="col-4 ">
                <div className="row font-weight-bold justify-content-start">
                  AIR
                </div>
                <div className="row">{this.props.recipe.water} ml</div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <input
                  className="form-control"
                  type="number"
                  id="coffeeBrewInput"
                  aria-describedby="beanHelp"
                  defaultValue={this.props.recipe.coffeeWeight}
                  onChange={this.handleOnChangeCoffee}
                  min="1"
                />
                <small id="beanHelp" class="form-text text-muted mt-0">
                  Masukan jumlah kopi
                </small>
              </div>
              <div className="col-6">
                <div
                  className="form-control text-left"
                  aria-describedby="waterHelp"
                >
                  {Math.floor(this.state.water)}
                </div>
                <small id="waterHelp" class="form-text text-muted mt-0">
                  Air yang harus digunakan
                </small>
              </div>
            </div>

            <div className="row mt-4 px-2">
              <h5 className="mb-1">
                <u>CATATAN</u>
              </h5>
            </div>

            <div className="row px-2">{this.props.recipeDetails.note}</div>

            <div className="row mt-4 px-2">
              <h5 className="mb-1">
                <u>RASA</u>
              </h5>
            </div>
            <div className="row justify-content-center px-2">
              <RadarRecipe data={this.props.recipeDetails} />
            </div>

            <div className="row justify-content-center my-3">
              <div className="col-5">
                <ButtonToolbar>
                  <Button
                    className="btn-block btn-secondary"
                    bsStyle="primary"
                    onClick={this.handleShowComment}
                  >
                    <Disqus.CommentCount
                      shortname={disqusShortname}
                      config={disqusConfig}
                    >
                      Comments
                    </Disqus.CommentCount>
                  </Button>

                  <Modal
                    {...this.props}
                    show={this.state.showComment}
                    onHide={this.handleHideComment}
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-lg">
                        Comment
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Disqus.DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn-secondary" onClick={this.handleHideComment}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </ButtonToolbar>
              </div>

              <div className="col-5 ">
                <ButtonToolbar>
                  <Button
                    className="btn-block btn-secondary"
                    bsStyle="primary"
                    onClick={this.handleShowReview}
                  >
                    {this.props.reviews.length} &nbsp; Review
                  </Button>

                  <Modal
                    {...this.props}
                    show={this.state.showReview}
                    onHide={this.handleHideReview}
                    dialogClassName="custom-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-lg">
                        Review
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container ">
                        <div className="row ">
                          {this.props.reviews.map((review, index) => (
                            <div className="col-12 ">
                              <ReviewCard data={review} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn-secondary" onClick={this.handleHideReview}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </ButtonToolbar>
              </div>
            </div>

            <div className="row mt-4 justify-content-center">
              <div className="col-12 bg-light border-top border-bottom my-2">
                <h5 className="mb-0 py-1">TAHAPAN</h5>
              </div>
              {this.props.recipeSteps.map((recipeStep) => (
                <div className="col-12">
                  <StepCard data={recipeStep} />
                </div>
              ))}
              <div className="col-12 my-3">
                <button
                  type="button"
                  className="btn btn-dark btn-block"
                  onClick={this.handleOnClickButton}
                >
                  Mulai
                </button>
              </div>
              {/* if user has not log in */}
              <Modal show={this.state.showStartDemo}>
                <Modal.Body>Anda Harus Login Terlebih Dahulu</Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ showStartDemo: false });
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    value="Submit"
                    type="submit"
                    variant="secondary"
                    onClick={(e) => this.props.history.push('/login')}
                  >
                    Login
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  'recipe, recipeDetails, recipeSteps, backButton, recipeCreator, methods, reviews, userMe, grinds, deleteRecipeStatus',
  actionsRecipes,
)(RecipeDetail);
