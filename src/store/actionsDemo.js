import axios from 'axios';

// eslint-disable-next-line
import store from './store';

const actionsDemo = (store) => ({
  // setter timer state
  setTimer(state, value) {
    if (value === 0) {
      return { stepIndex: store.getState().stepIndex + 1 };
    }
    return { timerNow: value };
  },
  // setter stepIndex state
  setStepIndex(state, value) {
    return { stepIndex: value };
  },
  // setter waterNow state
  setWaterNow(state, value) {
    return { waterNow: value };
  },
  // setter timerNow state
  setTimerNow(state, value) {
    return { timerNow: value };
  },
  // setter stepWater state
  setStepWater(state, value) {
    return { stepWater: value };
  },
  // setter stepTime state
  setStepTime(state, value) {
    return { stepTime: value };
  },
  // setter waterLimit state
  setWaterLimit(state, value) {
    return { waterLimit: value };
  },
  // reset state associated with recipe demo
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

  // make request with axios to post history
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
  // make request with axios to post review
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
      .then((response) => {})
      .catch((error) => {
        console.log('Error postReview', error);
        /* eslint-enable no-console */
      });
  },
});

export default actionsDemo;
