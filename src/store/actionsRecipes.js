import axios from 'axios';
import Swal from 'sweetalert2';
import store from './store';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
});

const actionsRecipes = (store) => ({
  // setter data
  setListCategory(state, value) {
    return { listCategory: value };
  },

  setBeanRatio(state, value) {
    return { beanRatio: value };
  },

  setWater(state, value) {
    return { water: value };
  },

  setRecipe(state, value) {
    return { recipe: value };
  },
  setRecipes(state, value) {
    return { recipes: value };
  },
  setRecipesSelection(state, value) {
    return { recipesSelection: value };
  },
  setStepTypeNumberSelected(state, value) {
    return { stepTypeNumberSelected: value };
  },
  setRecipeSteps(state, value) {
    return { recipeSteps: value };
  },
  setSearchParams(state, value) {
    return { searchParams: value };
  },
  setSearchKeyword(state, value) {
    return { searchKeyword: value };
  },
  setOriginsParams(state, value) {
    return { originsParams: value };
  },
  setDifficultiesParams(state, value) {
    return { difficultiesParams: value };
  },
  setMethodsParams(state, value) {
    return { methodsParams: value };
  },
  setResetTimer(state) {
    store.setState({ timerNow: 0 });
    store.setState({ stepIndex: 0 });
    store.setState({ waterNow: 0 });
    store.setState({ waterLimit: 0 });
    store.setState({ stepTime: 0 });
    store.setState({ stepWater: 0 });
  },
  setTimerNow(state, value) {
    return { timerNow: value };
  },
  setRecipesSearch(state, value) {
    return { recipesSearch: value };
  },
  setDeleteRecipeStatus(state, value) {
    return { deleteRecipeStatus: value };
  },
  setDataUserMe(state, value) {
    return { userMe: value };
  },
  setShowPostRecipe(state, value) {
    return { showPostRecipe: value };
  },
  setShowPutRecipe(state, value) {
    return { showPutRecipe: value };
  },
  // axios

  async postRecipe(state, data) {
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/recipes`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ recipe: response.data });
        sessionStorage.removeItem('Recipe');
        sessionStorage.removeItem('RecipeDetail');
        sessionStorage.removeItem('note');
        sessionStorage.removeItem('stepTemporary');
        store.setState({ showPostRecipe: false });
      })
      .catch((error) => {
        store.setState({ showPostRecipe: false });
        Toast.fire({
          type: 'error',
          title: `${error.response.data.message}`,
        });
      });
  },
  async getRecipes(state, paramsInput) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes`,
      params: paramsInput,
    };

    await axios(config).then((response) => {
      store.setState({ recipes: response.data.recipes });
    });
  },
  async getRecipesSelection(state, paramsInput) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes`,
      params: paramsInput,
    };

    await axios(config).then((response) => {
      store.setState({ recipesSelection: response.data });
    });
  },

  async searchRecipes(state, filterParams, searchParams, pagination) {
    const paramsInput = filterParams;
    paramsInput.search = searchParams;
    paramsInput.p = pagination;
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes`,
      params: paramsInput,
    };

    await axios(config)
      .then((response) => {
        /* eslint-disable no-console */
        store.setState({ recipesSearch: response.data });
      })
      .catch((error) => {
        console.log(error);
        /* eslint-enable no-console */
      });
  },
  async putRecipe(state, data, id) {
    const config = {
      method: 'put',
      url: `${store.getState().baseURL}/recipes/${id}`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ recipe: response.data });
        sessionStorage.removeItem('Recipe');
        sessionStorage.removeItem('RecipeDetail');
        sessionStorage.removeItem('note');
        sessionStorage.removeItem('stepTemporary');
        store.setState({ showPutRecipe: false });
      })
      .catch((error) => {
        store.setState({ showPutRecipe: false });
        Toast.fire({
          type: 'error',
          title: `${error.response.data.message}`,
        });
      });
  },

  // async getRecipes(state, paramsInput = null) {
  //   let config = {
  //     method: "get",
  //     url: store.getState().baseURL + "/recipes"
  //   };

  //   if (paramsInput !== null) {
  //     let config = {
  //       method: "get",
  //       url: store.getState().baseURL + "/recipes",
  //       params: paramsInput
  //     };
  //   }

  //   await axios(config).then(response => {
  //     store.setState({ recipes: response.data.data });
  //   });
  // },
  async getRecipeByID(state, id) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes/${id}`,
    };

    await axios(config)
      .then((response) => {
        store.setState({
          recipeDetails: response.data.data.recipeDetails,
        });
        store.setState({ recipeSteps: response.data.data.recipeSteps });
        store.setState({ recipe: response.data.data.recipe });
        store.setState({ recipeCreator: response.data.data.user });
      })
      .catch((error) => {
        store.setState({ recipe: false });
      });
  },
  async getReview(state, paramsInput) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/reviews`,
      params: paramsInput,
    };

    await axios(config).then((response) => {
      store.setState({ reviews: response.data.data });
    });
  },
  async getProfile(state) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/users/me`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ userMe: response.data.data });
      })
      .catch((error) => {
        store.setState({ userMe: false });
      });
  },
  async deleteRecipe(state, id) {
    const config = {
      method: 'delete',
      url: `${store.getState().baseURL}/recipes/${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ deleteRecipeStatus: true });
        Toast.fire({
          type: 'success',
          title: 'Resep Berhasil Dihapus',
        });
      })
      .catch((error) => {
        Toast.fire({
          type: 'error',
          title: `${error.response.data.message}`,
        });
      });
  },

});

export default actionsRecipes;
