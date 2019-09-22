import React from 'react';

// import store
import { connect } from 'unistore/react';
import actionsRecipes from '../store/actionsRecipes';

// import components
import Radar from '../components/RadarRecipe';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      methodID: 1,
      difficulty: 1,
      coffeeWeight: '',
      water: '',
      grindSize: 1,
      waterTemp: '',
      beanName: '',
      originID: 1,
      beanProcess: '',
      beanRoasting: '',
      fragrance: 0.5,
      aroma: 0.5,
      cleanliness: 0.5,
      sweetness: 0.5,
      taste: 0.5,
      acidity: 0.5,
      aftertaste: 0.5,
      balance: 0.5,
      globalTaste: 0.5,
      body: 0.5,
      recipeDataTeporary: [],
    };
  }

  componentDidMount = async () => {
    await this.setState({
      recipeDataTeporary: {
        ...JSON.parse(sessionStorage.getItem('Recipe')),
        ...JSON.parse(sessionStorage.getItem('RecipeDetail')),
      },
    });
    await this.setState({
      name: this.state.recipeDataTeporary.name,
      methodID: this.state.recipeDataTeporary.methodID,
      difficulty: this.state.recipeDataTeporary.difficulty,
      coffeeWeight: this.state.recipeDataTeporary.coffeeWeight,
      water: this.state.recipeDataTeporary.water,
      grindSize: this.state.recipeDataTeporary.grindSize,
      waterTemp: this.state.recipeDataTeporary.waterTemp,
      beanName: this.state.recipeDataTeporary.beanName,
      originID: this.state.recipeDataTeporary.originID,
      beanProcess: this.state.recipeDataTeporary.beanProcess,
      beanRoasting: this.state.recipeDataTeporary.beanRoasting,
      fragrance: this.state.recipeDataTeporary.fragrance,
      aroma: this.state.recipeDataTeporary.aroma,
      cleanliness: this.state.recipeDataTeporary.cleanliness,
      sweetness: this.state.recipeDataTeporary.sweetness,
      taste: this.state.recipeDataTeporary.taste,
      acidity: this.state.recipeDataTeporary.acidity,
      aftertaste: this.state.recipeDataTeporary.aftertaste,
      balance: this.state.recipeDataTeporary.balance,
      globalTaste: this.state.recipeDataTeporary.globalTaste,
      body: this.state.recipeDataTeporary.body,
    });
  };

  handleChangeRecipe = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeRecipeDetail = (event) => {
    this.setState({ [event.target.name]: parseFloat(event.target.value) });
  };

  submitRecipe = async (event) => {
    await sessionStorage.setItem(
      'Recipe',
      JSON.stringify({
        name: this.state.name,
        methodID: this.state.methodID,
        originID: this.state.originID,
        beanName: this.state.beanName,
        beanProcess: this.state.beanProcess,
        beanRoasting: this.state.beanRoasting,
        difficulty: this.state.difficulty,
        coffeeWeight: this.state.coffeeWeight,
        water: this.state.water,
      }),
    );
    await sessionStorage.setItem(
      'RecipeDetail',
      JSON.stringify({
        fragrance: this.state.fragrance,
        aroma: this.state.aroma,
        cleanliness: this.state.cleanliness,
        sweetness: this.state.sweetness,
        taste: this.state.taste,
        acidity: this.state.acidity,
        aftertaste: this.state.aftertaste,
        balance: this.state.balance,
        globalTaste: this.state.globalTaste,
        body: this.state.body,
        grindSize: this.state.grindSize,
        waterTemp: this.state.waterTemp,
      }),
    );
    this.props.history.push(
      `/recipe/edit/addstep/${this.props.match.params.recipeID}`,
    );
  };

  render() {
    return (
      <div>
        <img
          className="backbutton"
          src={this.props.backButton}
          onClick={(event) =>
            this.props.history.push(
              `/recipe/${this.props.match.params.recipeID}`,
            )
          }
          alt="backButton"
        />
        <div className="container">
          <form onSubmit={this.submitRecipe}>
            <div className=" row ">
              <label htmlFor="name">Nama Resep</label>
            </div>

            <div className=" row justify-content-center text-center">
              <input
                className="form-control"
                type="text"
                name="name"
                defaultValue={this.state.name}
                onChange={this.handleChangeRecipe}
                required
              />
            </div>
            <div className="row form-group">
              <label htmlFor="methodID">Pilih Metode Brew</label>

              <select
                className="form-control"
                id="methodID"
                name="methodID"
                defaultValue={this.state.methodID}
                onChange={this.handleChangeRecipe}
                required
              >
                <option selected disabled>
                  -Pilih-
                </option>
                {this.props.methods.map((method, index) => (
                  <option value={method.id}>{method.name}</option>
                ))}
              </select>
            </div>
            <div className="row form-group">
              <label htmlFor="difficulty">Tingkat Kesulitan</label>

              <select
                className="form-control"
                id="difficulty"
                name="difficulty"
                defaultValue={this.state.difficulty}
                onChange={this.handleChangeRecipe}
                required
              >
                <option selected disabled>
                  -Pilih-
                </option>
                <option value="1">Mudah</option>
                <option value="2">Sedang</option>)
                <option value="3">Sulit</option>)
              </select>
            </div>
            <div className=" row ">
              <div className=" col-3  ">
                <div className=" row justify-content-center border">
                  <div className=" col-12">
                    <label htmlFor="coffeeWeight">
                      Jumlah
                      <br />
                      Biji (gr)
                    </label>
                  </div>
                  <div className=" col-12">
                    <img
                      src={require('../assets/images/RecipeIcon/coffee.png')}
                      className="w-50 py-2"
                      alt="altTag"
                    />
                  </div>
                  <div className=" col-9 px-0">
                    <input
                      className="form-control"
                      type="number"
                      name="coffeeWeight"
                      defaultValue={this.state.coffeeWeight}
                      placeholder="16"
                      min="1"
                      onChange={this.handleChangeRecipe}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className=" col-3  ">
                <div className=" row justify-content-center border">
                  <div className=" col-12">
                    <label htmlFor="water">
                      Jumlah
                      <br />
                      Air (ml)
                    </label>
                  </div>
                  <div className=" col-12">
                    <img
                      src={require('../assets/images/RecipeIcon/water.png')}
                      className="w-50 py-2"
                      alt="altTag"
                    />
                  </div>
                  <div className=" col-9 px-0">
                    <input
                      className="form-control"
                      type="number"
                      name="water"
                      defaultValue={this.state.water}
                      placeholder="200"
                      min="1"
                      onChange={this.handleChangeRecipe}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className=" col-3 ">
                <div className=" row justify-content-center border">
                  <div className=" col-12">
                    <label htmlFor="grindSize">
                      Ukuran
                      <br />
                      Butir
                    </label>
                  </div>
                  <div className=" col-12">
                    <img
                      src={require('../assets/images/RecipeIcon/coffee-grinder.png')}
                      className="w-50 py-2"
                      alt="altTag"
                    />
                  </div>
                  <div className=" col-9 px-0">
                    <select
                      className="form-control"
                      id="grindSize"
                      name="grindSize"
                      defaultValue={this.state.grindSize}
                      onChange={this.handleChangeRecipe}
                      required
                    >
                      <option selected disabled>
                        -Pilih-
                      </option>
                      {this.props.grinds.map((grindSize, index) => (
                        <option value={grindSize.id}>{grindSize.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className=" col-3">
                <div className=" row justify-content-center border">
                  <div className=" col-12">
                    <label htmlFor="waterTemp">
                      Suhu
                      <br />
                      Air (&deg;C)
                    </label>
                  </div>
                  <div className=" col-12">
                    <img
                      src={require('../assets/images/RecipeIcon/thermometer.png')}
                      className="w-50 py-2"
                      alt="altTag"
                    />
                  </div>
                  <div className=" col-9 px-0">
                    <input
                      className="form-control"
                      type="number"
                      name="waterTemp"
                      defaultValue={this.state.waterTemp}
                      placeholder="92"
                      min="1"
                      onChange={this.handleChangeRecipe}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" row justify-content-center bg-warning">
              Profile Biji
            </div>

            <div className=" row ">
              <label htmlFor="beanName">Biji :</label>
            </div>

            <div className=" row justify-content-center text-center">
              <input
                className="form-control"
                type="text"
                name="beanName"
                defaultValue={this.state.beanName}
                placeholder="biji"
                onChange={this.handleChangeRecipe}
                required
              />
            </div>

            <div className="row form-group">
              <label htmlFor="originID">Origin : </label>

              <select
                className="form-control"
                id="originID"
                name="originID"
                defaultValue={this.state.originID}
                onChange={this.handleChangeRecipe}
                required
              >
                <option selected disabled>
                  -Pilih-
                </option>
                {this.props.origins.map((origin, index) => (
                  <option value={origin.id}>{origin.name}</option>
                ))}
                <option>lainnya</option>)
              </select>
            </div>

            <div className=" row ">
              <label htmlFor="beanProcess">Proses :</label>
            </div>

            <div className=" row justify-content-center text-center">
              <input
                className="form-control"
                type="text"
                name="beanProcess"
                defaultValue={this.state.beanProcess}
                placeholder="proses"
                onChange={this.handleChangeRecipe}
                required
              />
            </div>

            <div className=" row ">
              <label htmlFor="beanRoasting">Roasting :</label>
            </div>

            <div className=" row justify-content-center text-center">
              <input
                className="form-control"
                type="text"
                name="beanRoasting"
                defaultValue={this.state.beanRoasting}
                placeholder="beanRoasting"
                onChange={this.handleChangeRecipe}
                required
              />
            </div>
            <Radar
              data={{
                fragrance: this.state.fragrance,
                aroma: this.state.aroma,
                cleanliness: this.state.cleanliness,
                sweetness: this.state.sweetness,
                taste: this.state.taste,
                acidity: this.state.acidity,
                aftertaste: this.state.aftertaste,
                balance: this.state.balance,
                globalTaste: this.state.globalTaste,
                body: this.state.body,
              }}
            />

            {this.props.flavors.map((flavor, index) => (
              <div className="row">
                <div className="col-3">
                  <label htmlFor="customRange1">{flavor}</label>
                </div>
                <div className="col-9">
                  <input
                    type="range"
                    className="custom-range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.state[flavor]}
                    id={flavor}
                    name={flavor}
                    onChange={this.handleChangeRecipeDetail}
                  />
                </div>
              </div>
            ))}
            <div className=" row justify-content-center text-center">
              <input
                className=" btn btn-dark btn-block my-3"
                type="submit"
                value="Next"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// export default Steps;
export default connect(
  'methods, grinds, flavors, origins, recipeDetails, backButton, recipe, stepTypes, recipeSteps, waterLimit, backButton, recipeCreator, reviews, userMe',
  actionsRecipes,
)(CreateRecipe);
