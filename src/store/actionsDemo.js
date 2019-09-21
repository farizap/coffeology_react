import axios from 'axios';
import Swal from 'sweetalert2';
import store from './store';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
});

const actionsDemo = (store) => ({
  // setter data
  setTimer(state, value) {
    if (value === 0) {
      return { stepIndex: store.getState().stepIndex + 1 };
    }
    return { timerNow: value };
  },
  setStepIndex(state, value) {
    return { stepIndex: value };
  },
  setWaterNow(state, value) {
    return { waterNow: value };
  },
  setTimerNow(state, value) {
    return { timerNow: value };
  },
  setStepWater(state, value) {
    return { stepWater: value };
  },
  setStepTime(state, value) {
    return { stepTime: value };
  },
  setWaterLimit(state, value) {
    return { waterLimit: value };
  },
  setResetTimer(state) {
    store.setState({ timerNow: 0 });
    store.setState({ stepIndex: 0 });
    store.setState({ waterNow: 0 });
    store.setState({ waterLimit: 0 });
    store.setState({ stepTime: 0 });
    store.setState({ stepWater: 0 });
  },
  shiftRecipeSteps(state) {
    const recipeStepsShifted = store.getState().recipeSteps.shift();
    return { recipeSteps: recipeStepsShifted };
  },

  async postHistory(state, data) {
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/history`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        /* eslint-disable no-console */
        store.setState({ historyID: response.data.data.id });
      })
      .catch((error) => console.log('Error postHistory', error));
  },

  async postReview(state, data) {
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/reviews`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => { })
      .catch((error) => {
        console.log('Error postReview', error);
        /* eslint-enable no-console */
      });
  },
});

export default actionsDemo;
